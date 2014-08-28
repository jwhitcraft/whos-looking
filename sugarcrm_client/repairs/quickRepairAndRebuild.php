<?php

    //run a quick repair and rebuild
    require_once('modules/Administration/QuickRepairAndRebuild.php');

    $RAC = new RepairAndClear();
    $RAC->repairAndClearAll(
        array('clearAll'),
        array(translate('LBL_ALL_MODULES')),
        false,
        true
    );

    require_once('jssource/minify.php');
    $from = getcwd();
    $minifyUtils = new SugarMinifyUtils();
    $minifyUtils->BackUpAndCompressScriptFiles($from, "", false);
    $minifyUtils->ConcatenateFiles($from, true);

    // Run this again *sigh*
    $RAC->repairAndClearAll(
        array('clearAll'),
        array(translate('LBL_ALL_MODULES')),
        false,
        true
    );

?>
