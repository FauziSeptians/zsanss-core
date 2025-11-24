import {Builder} from "../lib/utils/design-patern/builder";
import factory from "./utils/design-patern/factory";
import formatCurrency from "./utils/number/format-currency";
import { mean } from "./utils/number/mean";
import { median } from "./utils/number/median";
import percentage from "./utils/number/percentage";
import roundTo from "./utils/number/round-to";
import { sum } from "./utils/number/sum";
import { uniqueArray } from "./utils/number/unique-array";
import { ArrayHandler } from "./utils/object/array-handler";
import flattenArray from "./utils/object/flatten-array";
import objectClone from "./utils/object/object-clone";
import { ObjectHandler } from "./utils/object/object-handler";
import capitalize from "./utils/string/capitalize";
import maskEmail from "./utils/string/maskEmail";
import slugify from "./utils/string/slugify";
import truncate from "./utils/string/truncate";

export default {
  Builder,
  factory,
  uniqueArray,
  formatCurrency,
  mean,
  median,
  percentage,
  roundTo,
  sum,
  capitalize,
  maskEmail,
  slugify,
  truncate,
  ArrayHandler,
  flattenArray,
  objectClone,
  ObjectHandler
};