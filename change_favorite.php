<?php
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
 * Save course order in course_overview block
 *
 * @package    block_course_overview
 * @copyright  2012 Adam Olley <adam.olley@netspot.com.au>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('AJAX_SCRIPT', true);

require_once(__DIR__ . '/../../config.php');
require_once(__DIR__ . '/locallib.php');

require_sesskey();
require_login();

$PAGE->set_context(context_system::instance());

$action = required_param('action', PARAM_ALPHA);
$courseid = required_param('id', PARAM_INT);
$block_instanceid = required_param('block_instanceid', PARAM_INT);
$current_tab = required_param('current_tab', PARAM_ALPHA);

switch ($action) {
    case 'favourite' :
        block_course_overview_add_favourite($courseid);
        break;
    case 'unfavourite' :
        block_course_overview_remove_favourite($courseid);
        break;
}

$blockinstance= block_instance_by_id($block_instanceid);
$blockinstance->current_tab=$current_tab;

echo json_encode($blockinstance->get_content());
