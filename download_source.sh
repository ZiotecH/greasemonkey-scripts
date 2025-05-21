revision=1405
sourceURL="https://kittensgame.com/web/"
webList=("game" "config" "core" "i18n")
jsList=("achievements" "buildings" "calendar" "challenges" "diplomacy" "math" "prestige" "religion" "resources" "science" "settings" "space" "stats" "time" "toolbar" "ui" "village" "void" "workshop")
jsxList=("chiral" "left" "mid" "queue" "toolbar")
libList=("dojo.xd.js" "dropbox_v2.js" "jQuery.js?v=_2" "lz-string.js" "md5.js" "react.min.js" "system.js")

if [ ! -d "source" ]; then
    mkdir "source"
fi
if [ ! -d "source/js" ]; then
    mkdir "source/js"
fi
if [ ! -d "source/js/jsx" ]; then
    mkdir "source/js/jsx"
fi
if [ ! -d "source/lib" ]; then
    mkdir "source/lib"
fi

cd ./source/
for file in "${webList[@]}"; do
    wget "$sourceURL$file.js?rev_=$revision" && mv "$file.js?rev_=$revision" "$file.js"
done
cd ./lib/
for file in "${libList[@]}"; do
    wget "$sourceURL/lib/$file"
done
mv "jQuery.js?v=_2" "jQuery.js"
cd ../js/
for file in "${jsList[@]}"; do
    wget "$sourceURL/js/$file.js?rev_=$revision" && mv "$file.js?rev_=$revision" "$file.js"
done
cd ./jsx/
for file in "${jsxList[@]}"; do
    wget "$sourceURL/js/jsx/$file.jsx.js?rev_=$revision" && mv "$file.jsx.js?rev_=$revision" "$file.jsx.js"
done
cd ../../../