import {Builder} from "../lib/utils/design-patern/builder";
import factory from "./utils/design-patern/factory";
import formatCurrency from "./utils/number/format-currency";
import { mean } from "./utils/number/mean";
import { median } from "./utils/number/median";
import percentage from "./utils/number/percentage";
import roundTo from "./utils/number/round-to";
import { sum } from "./utils/number/sum";
import { uniqueArray } from "./utils/number/unique-array";

export default {
  Builder,
  factory,
  uniqueArray,
  formatCurrency,
  mean,
  median,
  percentage,
  roundTo,
  sum
};