"use strict";

import {Calendar, views} from "./FC.js";
import DayConfig from "./day/Config.js";
import WeekConfig from "./week/Config.js";
import CalendarMixin from "./CalendarMixin.js";


views.resourceDay = DayConfig;
views.resourceWeek = WeekConfig;

Calendar.mixin(CalendarMixin);
