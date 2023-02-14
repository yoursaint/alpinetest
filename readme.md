# clone repository
```
run --name repo alpine/git clone https://github.com/docker/getting-started.git
```
# not found "kern.log"
Please, check your command for running docker instance

if you don't run docker with privileged mode, the error is appeared.

Compare your command with below
```
docker run --privileged -it <image_name> /bin/sh
```

After you run the instance with privileged mode, you can excute the command for running rsyslogd(it is server running command).

Finally you can find the log file when you use the command below.
```
/app # ls /var/log/
kern.log  messages
```

