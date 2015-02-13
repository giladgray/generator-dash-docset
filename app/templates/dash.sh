DIR=../Dash-User-Contributions/docsets/<%= apiName %>

# recreate directory
rm -r $DIR
mkdir $DIR

# copy docset files
cp ./<%= name %>.tgz ./docset.json ./<%= name %>.docset/icon.png ./<%= name %>.docset/icon@2x.png $DIR/
cp CONTRIB.md $DIR/README.md
