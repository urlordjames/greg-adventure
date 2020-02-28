# greg-adventure
join Gregory in his javascript browser game

# how to play?
currently, the game is available on <http://173.255.230.249:8080>

# how to install on my server? (linux)
after making sure you have [docker](https://docs.docker.com/install/) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed, make a clone of the repository and cd into it
```bash
git clone https://github.com/urlordjames/greg-adventure.git && cd greg-adventure
```
then move [greg.service](https://github.com/urlordjames/greg-adventure/blob/master/greg.service) to your systemd services directory
```bash
mv greg.service /etc/systemd/system/greg.service
```
you will most likely have to reload the systemctl daemon for it to work
```bash
systemctl daemon-reload
```
if you cannot run [build.sh](https://github.com/urlordjames/greg-adventure/blob/master/build.sh) add run permissions then run it
```bash
chmod +x build.sh
./build.sh
```
now you can start the systemd service
```bash
systemctl start greg.service
```
yay it's up now! it can be found at [http://(your IP):8080/](http://127.0.0.1:8080/)