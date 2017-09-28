(function($, Drupal, CKEDITOR) {
  'use strict';
  var PLUGID = 'widgetboxout';
  CKEDITOR.plugins.add(PLUGID, {
    requires: 'widget',
    icons: PLUGID,
    hidpi: true,
    beforeInit: function(editor) {
      editor.on('widgetDefinition', function(event) {
        var widget = event.data;
        if (widget.name !== PLUGID) {
          return;
        }
        widget.allowedContent = 'div(!mybox,align-left,align-right,align-center){width};' +
          'div(!mybox-content); h2(!mybox-title)';
        widget.requiredContent = 'div(mybox)';
        widget.template = '<div class="mybox">' +
          '<h2 class="mybox-title">Title</h2>' +
          '<div class="mybox-content"><p>Content...</p></div>' +
          '</div>';
        widget.upcast = function(element) {
          return element.name == 'div' && element.hasClass('mybox');
        };
        widget.editables = {
          title: {
            selector: '.mybox-title',
            allowedContent: 'br strong em sup sub'
          },
          content: {
            selector: '.mybox-content',
            allowedContent: 'p; ol; ul; li; em; strong; s; sup; sub; h2; h3; br; hr;' +
              'table[summary,cellpadding,cellspacing,border]{width}; caption; thead; tbody; tr; th[width]; ' +
              'td[width,align,scope,rowspan,colspan]; th[scope,align,rowspan,colspan];' +
              'drupal-entity[data-embed-button,data-entity-embed-display,data-entity-type,data-entity-uuid];' +
              'img[src,alt,title,width,height,data-*];'
          }
        };
        widget._dataToDialogValues = function(element) {
          var dialogValues = {};

          dialogValues.header_element_type = element.find('.mybox-title')
            .getItem(0)
            .getName();

          var s = element
            .getAttribute('class')
            .split(' ');
          var n = []
          s.forEach(function(current, index, self) {
            if (editor.config.WidgetBox_CSS_Classes.indexOf(current) === -1) { // current !== 'plain' &&  current !== 'default') { // TODO : interface de config des classes
              n.push(current)
            } else {
              dialogValues.style = current // classes exclusives, la dernière remporte la mise...
            }
          });
          return dialogValues;
        };
        widget._dialogValuesToData = function(dialogValues) {
          var data = {};
          data.balise = dialogValues.attributes.header_element_type;
          data.style = dialogValues.attributes.style;
          return data;
        };
        widget._createSave = function(editor, widget) {
          return function(values) {
            var data;
            editor.fire('saveSnapshot');
            data = widget._dialogValuesToData(values);
            widget.element.find('.mybox-title')
              .getItem(0)
              .renameNode(data.balise);

            var s = widget.element
              .getAttribute('class')
              .split(' ');

            var n = []
            s.forEach(function(current, index, self) {
              if (editor.config.WidgetBox_CSS_Classes.indexOf(current) === -1) { //  current !== 'plain' &&  current !== 'default') { // TODO : interface de config des classes
                n.push(current)
              }
            });
            if (data.style !== 'default') {
              n.push(data.style)
            }
            widget.element.setAttribute('class', n.join(' '));
            var firstEdit = !widget.ready;
            var container = widget.wrapper.getParent(true);
            if (firstEdit) {
              editor.widgets.finalizeCreation(container);
            }
            setTimeout(function() {
              widget.focus();
              editor.fire('saveSnapshot');
            });
            return widget;
          }
        }
      });
      editor.widgets.on('instanceCreated', function(event) {
        var widget = event.data;
        if (widget.name !== PLUGID) {
          return;
        }
        widget.on('edit', function(event) {
          var settings = {
            dialogSettings: {
              dialogClass: 'widgetboxout-dialog',
            },
            saveCallback: widget._createSave(editor, widget)
          };
          event.cancel();
          if (widget.ready) {
            settings.dialogSettings.title = editor.config.WidgetBox_dialogTitleEdit;
          } else {
            settings.dialogSettings.title = editor.config.WidgetBox_dialogTitleAdd;
          }
          settings.existingValues = widget._dataToDialogValues(widget.element);
          editor.execCommand('edit-my-box', settings);
        });
      });
      editor.addCommand('edit-my-box', {
        allowedContent: 'div[class]',
        modes: { wysiwyg: 1 },
        canUndo: true,
        exec: function(editor, data) {
          Drupal.ckeditor.openDialog(editor, Drupal.url('widgetboxout/dialog'), data.existingValues, data.saveCallback, data.dialogSettings);
        }
      });
      if (editor.ui.addButton) {
        editor.ui.addButton('WidgetBox', {
          label: Drupal.t('Box'),
          command: PLUGID,
          icon: this.path + 'icons/' + PLUGID + '.png'
        });
      }
      editor.widgets.add(PLUGID);
    },
    afterInit: function(editor) {}
  })
})(jQuery, Drupal, CKEDITOR);