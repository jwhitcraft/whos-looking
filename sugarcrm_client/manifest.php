<?php

$manifest = array (
  'acceptable_sugar_versions' =>
  array (
    'regex_matches' =>
    array (
      '7\\.[2-9]\\.\\d*',
      '7\\.\\d\\d\\.\\d*',
      '[8-9]\\.(.*?)',
    ),
  ),
  'acceptable_sugar_flavors' =>
  array (
    0 => 'PRO',
    1 => 'CORP',
    2 => 'ENT',
    3 => 'ULT',
  ),
  'readme' => '',
  'key' => 'f16e3a5c7bea84e3e93cd7c3286b3999a8cbe289',
  'author' => 'Jon Whitcraft',
  'description' => 'Who is also on the page your on',
  'icon' => '',
  'is_uninstallable' => true,
  'name' => 'Who is Looking',
  'published_date' => '2014-04-02 19:59:10',
  'type' => 'module',
  'version' => '1.0',
  'remove_tables' => '',
);

$installdefs = array (
  'id' => 'f16e3a5c7bea84e3e93cd7c3286b3999a8cbe289',
  'copy' =>
  array (
    array (
      'from' => '<basepath>/clients/base/views/looking/looking.js',
      'to' => 'custom/clients/base/views/looking/looking.js',
    ),
    array (
      'from' => '<basepath>/clients/base/views/looking/looking.hbs',
      'to' => 'custom/clients/base/views/looking/looking.hbs',
    ),
    array (
      'from' => '<basepath>/clients/base/views/looking/looking.php',
      'to' => 'custom/clients/base/views/looking/looking.php',
    ),
    array (
      'from' => '<basepath>/Extension/application/Ext/JSGroupings/WhosLooking.jsgroups.php',
      'to' => 'custom//Extension/application/Ext/JSGroupings/WhosLooking.jsgroups.php',
    ),
    array (
      'from' => '<basepath>/Extension/application/Ext/clients/base/layouts/footer/whoslooking.ext.php',
      'to' => 'custom/Extension/application/Ext/clients/base/layouts/footer/whoslooking.ext.php',
    ),
    array (
      'from' => '<basepath>/include/javascript/socket.io.js',
      'to' => 'custom/include/javascript/socket.io.js',
    ),
  ),
  'post_execute' => array(
    0 => '<basepath>/repairs/quickRepairAndRebuild.php',
  ),
  'post_uninstall' => array(
    0 => '<basepath>/repairs/quickRepairAndRebuild.php',
  ),
);

?>
