$revision = 1405
$sourceURL = "https://kittensgame.com/web/"
$fileList = [
    "game",
    "config",
    "core",
    "i18n",
    "js/achievements",
    "js/buildings",
    "js/calendar",
    "js/challenges",
    "js/diplomacy",
    "js/math",
    "js/prestige",
    "js/religion",
    "js/resources",
    "js/science",
    "js/settings",
    "js/space",
    "js/stats",
    "js/time",
    "js/toolbar",
    "js/ui",
    "js/village",
    "js/void",
    "js/workshop"
]

if(!(Test-Path "source")){New-Item -type Directory -name "source"|out-null }
if(!(Test-Path "source/js")){New-Item -type Directory -name "js" |out-null }

foreach($file in $fileList){
    wget "$($sourceURL)$($file).js?rev_=$($revision)" -outfile "source/$file.js"
}