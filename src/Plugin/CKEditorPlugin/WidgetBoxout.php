<?php

namespace Drupal\widgetboxout\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

use Drupal\widgetboxout\CssClasses;

/**
 * Defines the "Widget Box Out" plugin.
 *
 * @CKEditorPlugin(
 *   id = "widgetboxout",
 *   label = @Translation("Box Out Widget"),
 *   module = "ckeditor"
 * )
 */
class WidgetBoxout extends CKEditorPluginBase  {
  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'widgetboxout') . '/js/plugins/widgetboxout/plugin.js';
  }
   /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $css = new CssClasses;
    return [
      'WidgetBox_dialogTitleAdd' => $this->t('Insérer une boite'),
      'WidgetBox_dialogTitleEdit' => $this->t('Modifier la boite'),
      'WidgetBox_CSS_Classes' => array_keys($css->Classes())
    ];
  }

   /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'WidgetBox' => [
        'label' => $this->t('Widget box'),
        'image' => drupal_get_path('module', 'widgetboxout') . '/js/plugins/widgetboxout/icons/widgetboxout.png', // CKEditor attend que cela soit dans le dossier icons du nom du plugin
      ],
    ];
  }

}
