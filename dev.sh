#!/bin/bash

APACHE_PATH='C:/Langs/xampp/htdocs'

cp -a ./client/* $APACHE_PATH

cd server
npm run start