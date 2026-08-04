#!/usr/bin/env bash
#
# tutti.sh — lancia gli script 126-131 nella sequenza giusta
#
#   ./tutti.sh                 indaga tutti (non scrive niente)
#   ./tutti.sh applica         applica tutti, con conferma
#   ./tutti.sh togli           toglie tutti, in ordine inverso
#   ./tutti.sh > rapporto.txt  salva l'indagine su file
#
# Va lanciato dalla radice del sito. Trova gli script accanto a se',
# quindi funziona sia con patch/tutti.sh sia spostandolo altrove.
#
# L'ordine non e' casuale:
#   126 tocca ti-cta.js e inserisce lo script nelle pagine
#   127 riscrive i <title>          -> dopo, cosi' non tocca le stesse righe
#   128 aggiunge il banner in <head>
#   129 aggiunge il CSS in <head>   -> dopo il banner, per non incrociarsi
#   130 ripara i documenti annidati -> dopo, cosi' ripara anche l'aggiunto
#   131 tocca solo proposta-lingua.js, indipendente
# In 'togli' l'ordine si inverte.

set -u

QUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODO="${1:-indaga}"

SCRIPT=(
  "126-cta-app.py"
  "127-titoli.py"
  "128-banner-app.py"
  "129-occhiello.py"
  "130-riparazioni.py"
  "131-proposta-lingua.py"
)

case "$MODO" in
  indaga|applica|togli) ;;
  *)
    echo "Modo non valido: $MODO"
    echo "Usa: indaga (predefinito), applica, togli"
    exit 1
    ;;
esac

# --- controlli prima di partire ---------------------------------------------

if [ ! -d "js" ] || [ ! -d "blog" ]; then
  echo
  echo "Non sembra la radice del sito: mancano js/ o blog/."
  echo "Spostati nella cartella del sito e rilancia:"
  echo "    cd ~/Documents/\"Siti Web\"/studente-thuisitaliaans"
  echo "    $QUI/tutti.sh"
  echo
  exit 1
fi

MANCANTI=()
for s in "${SCRIPT[@]}"; do
  [ -f "$QUI/$s" ] || MANCANTI+=("$s")
done
if [ ${#MANCANTI[@]} -gt 0 ]; then
  echo "Script non trovati in $QUI:"
  printf '    %s\n' "${MANCANTI[@]}"
  exit 1
fi

ORDINE=("${SCRIPT[@]}")
if [ "$MODO" = "togli" ]; then
  ORDINE=()
  for (( i=${#SCRIPT[@]}-1 ; i>=0 ; i-- )); do
    ORDINE+=("${SCRIPT[$i]}")
  done
fi

# --- conferma per le modalita' che scrivono ---------------------------------

if [ "$MODO" != "indaga" ]; then
  echo
  echo "Stai per lanciare $MODO su $(pwd)"
  echo "Script: ${#ORDINE[@]}, in quest'ordine:"
  printf '    %s\n' "${ORDINE[@]}"
  echo
  printf "Procedo? [s/N] "
  read -r RISPOSTA
  case "$RISPOSTA" in
    s|S|si|Si|SI|y|Y) ;;
    *) echo "Annullato."; exit 0 ;;
  esac
fi

# --- esecuzione --------------------------------------------------------------

echo
echo "============================================================"
echo "  MODO: $(echo "$MODO" | tr '[:lower:]' '[:upper:]')   sito: $(pwd)"
echo "  $(date '+%Y-%m-%d %H:%M')"
echo "============================================================"

FALLITI=()
for s in "${ORDINE[@]}"; do
  echo
  echo "############################################################"
  echo "#  $s"
  echo "############################################################"
  if ! python3 "$QUI/$s" "$MODO"; then
    FALLITI+=("$s")
    echo
    echo "  >>> $s ha restituito un errore."
    if [ "$MODO" != "indaga" ]; then
      echo "  >>> Mi fermo qui per non lasciare il sito a meta'."
      echo "  >>> Per tornare indietro:  $QUI/tutti.sh togli"
      break
    fi
    echo "  >>> In indaga non scrivo niente, quindi proseguo."
  fi
done

# --- riepilogo ---------------------------------------------------------------

echo
echo "============================================================"
if [ ${#FALLITI[@]} -eq 0 ]; then
  echo "  Tutti gli script sono andati a buon fine."
  if [ "$MODO" = "indaga" ]; then
    echo
    echo "  Niente e' stato scritto. Quando i numeri ti convincono:"
    echo "      $QUI/tutti.sh applica"
  else
    echo
    echo "  Ricordati di escludere dal deploy i file di ripristino:"
    echo "      .127-titoli-originali.json"
    echo "      .130-backup/"
    echo "  (aggiungili a .assetsignore, altrimenti Wrangler li pubblica)"
  fi
else
  echo "  Script con problemi:"
  printf '      %s\n' "${FALLITI[@]}"
fi
echo "============================================================"
echo
