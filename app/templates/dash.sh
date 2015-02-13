# Copy files to local Dash-User-Contributions fork for publishing.
# @see https://github.com/Kapeli/Dash-User-Contributions#contribute-a-new-docset
#
# First, ensure your docset meets the guidelines for contribution:
# @see https://github.com/Kapeli/Dash-User-Contributions/wiki/Docset-Contribution-Checklist
#
# Then run `npm run tar` to create the archive.
# Finally, fill in the blanks in CONTRIB.md to describe your docset.
# Then run `npm run dash` to execute this script and copy files.

DIR="../Dash-User-Contributions/docsets/<%= apiName.replace(/\s+/g, '_') %>"

# recreate directory
rm -r $DIR
mkdir $DIR

# copy docset files
cp ./<%= name %>.tgz ./docset.json ./<%= name %>.docset/icon.png ./<%= name %>.docset/icon@2x.png $DIR/
cp CONTRIB.md $DIR/README.md
