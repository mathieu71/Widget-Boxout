Module: Boxout

Description
===========
This module is *heavily* based on the (Boxout)[https://www.drupal.org/project/boxout] module. 

The purpose of this module is to use a CKEditor widget for editing the box contents.

The Widget Boxout module is used to create a styled box in your page.
It is heavily based on the Boxout module, but it uses CKEditor widgets.

Installation
============
Put the module into your modules directory as usual.

Configuration
=============
Visit /admin/config/content/formats

Edit the configuration for each Input format, i.e. Basic HTML
/admin/config/content/formats/manage/basic_html

Enable the Widget Boxout button

ps: Widget Boxout uses a DIV element to wrap the box, make sure you configure the
text format to allow <div class=""> in Filter settings

How to use
==========
When you are editing an article you will see the Widget Boxout button, click on it to
see a popup where you can enter the title tag and a CSS class for the box. 
When you click Insert it will add a widget that will format and display the box accordin to the CSS class chosen.
You can type in the title and the content of the box. If you want to choose another CSS class, double click on the drag rectangle.

