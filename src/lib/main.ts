// --- Design Patterns ---
export { Builder } from "../lib/utils/design-pattern/builder";
export { default as factory } from "./utils/design-pattern/factory";

// --- Number Utils ---
export { default as formatCurrency } from "./utils/number/format-currency";
export { mean } from "./utils/number/mean";
export { median } from "./utils/number/median";
export { default as percentage } from "./utils/number/percentage";
export { default as roundTo } from "./utils/number/round-to";
export { sum } from "./utils/number/sum";
export { uniqueArray } from "./utils/number/unique-array";

// --- Object & Array Utils ---
export { ArrayHandler } from "./utils/object/array-handler";
export { default as flattenArray } from "./utils/object/flatten-array";
export { default as objectClone } from "./utils/object/object-clone";
export { ObjectHandler } from "./utils/object/object-handler";

// --- String Utils ---
export { default as capitalize } from "./utils/string/capitalize";
export { default as maskEmail } from "./utils/string/maskEmail";
export { default as slugify } from "./utils/string/slugify";
export { default as truncate } from "./utils/string/truncate";

// --- Hooks & Services ---
export { BaseApiService } from "./utils/services/baseApiService";
export { useAutoCarousel } from "./utils/hooks/useAutoCarousel";
export { useBaseInfiniteQuery } from "./utils/hooks/useBaseInfiniteQuery";
export { useDataTableMultiQuery } from "./utils/hooks/useDataTableMultipleQueries";
export { useModal } from "./utils/hooks/useModal";
export { useOnlineStatus } from "./utils/hooks/useOnlineStatus";
export { useOptimisticAction } from "./utils/hooks/useOptimisticAction";
export { usePagination } from "./utils/hooks/usePagination";
export { useScroll } from "./utils/hooks/useScroll";
export { createStepper } from "./utils/hooks/useStepper";
export { useSyncForm } from "./utils/hooks/useSyncForm";