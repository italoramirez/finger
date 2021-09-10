<?php
/* part 2 */
include_once './bd.php';
$con = new bd();
/* Se elimima infromación antigua del equipo que no vaya a afectar el registo y hace insert en la tabla temporal */
$delete = "delete from huellas_temp where pc_serial = '" . $_POST['token'] . "'";
$con->exec($delete);
$insert = "insert into huellas_temp (pc_serial, texto, statusPlantilla, opc) "
        . "values ('" . $_POST['token'] . "', 'El sensor de huella dactilar esta activado', 'Muestras Restantes: 4', 'capturar')";
$row = $con->exec($insert);
$con->desconectar();
/* Comunicación entre java y php desde el servidor */
/* Plugin en java espera a que la  fecha de actualización se modifique (huellas_temp) y hace el insert */
echo json_encode("{\"filas\":$row}");
 