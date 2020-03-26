#/bin/sh

python ./tools/importlvls.py
python ./tools/hacklibs.py
rm tools -Rf
rm levels -Rf
docker build -t greg .