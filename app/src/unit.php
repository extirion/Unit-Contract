<?php
echo "buu";
$valor= $_POST["val"];
if ($valor === "") {
    echo json_encode ("llena el campo");
}else {
    echo json_encode ("ya has llenado el campo");
};
echo json_encode($resp);