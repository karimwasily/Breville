#!/bin/bash

aemfed -t http://admin:test@localhost:4502 -w ../ui.apps/src/main/content/jcr_root/,../ui.content/src/main/content/jcr_root/ -e "**/.*.sw?"
