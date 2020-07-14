#!/bin/bash

DIST_NAME=$1
SERVER_PATH=$2
DIST_DIR=for-edw-ager
BAK_DIR=history

cd $SERVER_PATH
mkdir -p $BAK_DIR
mkdir -p $DIST_DIR
sudo rm -rf $DIST_DIR/*
tar -zxf $DIST_NAME -C $DIST_DIR/
mv $DIST_NAME $BAK_DIR

exit
