<?php
session_start();

print_r(headers_list());
echo $_SESSION["password"];