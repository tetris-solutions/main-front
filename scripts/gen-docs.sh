#!/usr/bin/env bash

mv .babelrc _babelrc
node_modules/.bin/documentation build --github -f html -o docs
mv _babelrc .babelrc