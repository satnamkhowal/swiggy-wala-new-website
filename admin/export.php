<?php
declare(strict_types=1);
require_once __DIR__ . '/../app/bootstrap.php';
sw_require_admin();
$allowed = ['new','contacted','quoted','confirmed','completed','cancelled'];
$status = trim((string)($_GET['status'] ?? '')); $q = trim((string)($_GET['q'] ?? ''));
$where=[];$params=[];
if ($status!=='' && in_array($status,$allowed,true)) { $where[]='status = ?'; $params[]=$status; }
if ($q!=='') { $where[]='(reference LIKE ? OR name LIKE ? OR phone LIKE ? OR pickup LIKE ? OR dropoff LIKE ?)'; $like='%'.$q.'%'; array_push($params,$like,$like,$like,$like,$like); }
$sql='SELECT reference,created_at,status,name,phone,email,trip_type,pickup,dropoff,pickup_date,pickup_time,return_date,vehicle,passengers,notes,source FROM leads'.($where?' WHERE '.implode(' AND ',$where):'').' ORDER BY created_at DESC';
$stmt=sw_db()->prepare($sql);$stmt->execute($params);
header('Content-Type: text/csv; charset=UTF-8'); header('Content-Disposition: attachment; filename="swiggy-wala-leads-'.date('Y-m-d').'.csv"');
$out=fopen('php://output','w'); fwrite($out,"\xEF\xBB\xBF");
$headers=['Reference','Created','Status','Name','Phone','Email','Trip Type','Pickup','Drop','Pickup Date','Pickup Time','Return Date','Vehicle','Passengers','Notes','Source']; fputcsv($out,$headers);
$protect=static function($v){$v=(string)$v;return preg_match('/^[=+\-@]/',$v)?"'".$v:$v;};
while($row=$stmt->fetch()){fputcsv($out,array_map($protect,array_values($row)));} fclose($out); exit;
