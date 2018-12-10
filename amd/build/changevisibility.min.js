// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * A javascript module to popup activity overviews
 *
 * @module     block_course_overview
 * @class      block
 * @package    block_course_overview
 * @copyright  2017 Howard Miller <howardsmiller@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'jqueryui', 'core/config' , 'core/templates', 'core/ajax'], function($, UI, mdlconfig, templates, ajax) {

    return {
        init: function() {

            $(".visibility_icon").click(function () {
                
                //step 1 : change the visibility 

                //on recupere l'onglet actif
                if($('#favourites').hasClass('active')){
                    current_tab='favourites';
                }
                if($('#courses').hasClass('active')){
                    current_tab='courses';
                }

                var data = {
                    sesskey : M.cfg.sesskey,
                    action : $(this).data('action'),
                    id : $(this).data('id'),
                    block_instanceid :$('[data-block="course_overview"]').data('instanceid'),
                    current_tab
                };

                $.post(
                    M.cfg.wwwroot + '/blocks/course_overview/change_visibility.php',
                    data
                ).done(function(new_data){

                    //variante 1 : 
                    //console.log(new_data);
                    
                    templates.render('block_course_overview/main',new Object()).done(function(html,js){
                        //console.log(html);
                        //$('[data-region="course-overview"]').replaceWith(html);
                       $('[data-region="course-overview"]').replaceWith(new_data.text);
                       templates.runTemplateJS(js);
                    });
                    
                    
                   // variante 2 :   
                   //step 2 : do something to re render the template now the course visibility have change (any way to change only the line? how it's done, look like it will change the full block)
                   //should look something like that I think, but I have no idea how I'm supposed to get the "new_data" ...
                   /*
                    templates.render('block_course_overview/main', new_data).done(function(html,js){
                      console.log(html);
                      $('[data-region="course-overview"]').replaceWith(html);
                       templates.runTemplateJS(js);
                    });
                    */
                    

        });
                  
                //Step 2 BIS : dumb solution to change the line -_-
/*                
                if($(this).data('action')=='hide')
                {
                    $(this).data('action','show');
                    $(this).attr('data-action','show');
                    $(this).addClass('fa-eye').removeClass('fa-eye-slash');
                    $(this).parent().next().children(":first").children(":first").toggleClass("dimmed");
                }
                else if($(this).data('action')=='show')
                {
                    $(this).data('action','hide');
                    $(this).attr('data-action','hide');
                    $(this).addClass('fa-eye-slash').removeClass('fa-eye');
                    $(this).parent().next().children(":first").children(":first").toggleClass("dimmed");
                }
*/                
            });
        }
    };
});
