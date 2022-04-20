echoSuccess() {
  echo -e "\033[32m $1 \033[0m"
}

echoFail() {
  echo -e "\033[31m $1 \033[0m"
}


echoSuccess "成功执行脚本文件"
