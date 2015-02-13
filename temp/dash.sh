DIR=../Dash-User-Contributions/docsets/asdf

# recreate directory
rm -r $DIR
mkdir $DIR

# copy docset files
cp ./asdf.tgz ./docset.json ./asdf.docset/icon.png ./asdf.docset/icon@2x.png $DIR/
cp CONTRIB.md $DIR/README.md
