#/bin/sh

python ./tools/importlvls.py
rm tools -Rf
rm levels -Rf
docker build -t greg .