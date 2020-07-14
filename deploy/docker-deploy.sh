#!/bin/bash

name=for-edw-ager
env=${1:-dev}
port=81
installDependency=${2:-true}

source_dir=$(cd "$(dirname $0)";cd ../;pwd)
start_time=`date +%s`

cd $source_dir

echo "${name}:$env build start..."

git checkout .
git pull

if [ $installDependency = true ]
then
  yarn
fi

yarn build:$env

echo "build successful. start build docker container..."

time=$(date "+%Y%m%d_%H%M%S")
sudo docker build -t $name:$time .
echo "docker container build successful."

# 判断容器是否存在
res=`sudo docker ps -a | grep $name`
if [ ${#res} -ne 0 ]
then
  sudo docker rm $name -f
  echo "removed container $name."
fi

echo "start deploy container..."
sudo docker run -p $port:80 -d --name="$name" $name:$time

end_time=`date +%s`
sum_time=$(($end_time - $start_time))
echo "deploy successful. total times: $sum_time seconds."
