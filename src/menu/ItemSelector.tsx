import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  AddBasketItem,
  ComplexItem,
  MenuItem,
  OptionGroup as OptionGroupType,
  SelectedOption,
  Variation,
} from "@/types";
import React, { useEffect, useRef, useState } from "react";

interface ItemSelectorProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToBasket: (item: AddBasketItem) => void;
}

export default function ItemSelector({
  item,
  isOpen,
  onClose,
  onAddToBasket,
}: ItemSelectorProps) {
  const [selectedVariation, setSelectedVariation] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const variationsRef = useRef<HTMLDivElement>(null);
  const optionGroupRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (isOpen) {
      setSelectedVariation("");
      setSelectedOptions([]);
      setHasError(false);
    }
  }, [isOpen]);

  const handleAddToBasket = () => {
    let variation: Variation | undefined = undefined;
    if (item.type === "complex") {
      const complexItem = item as ComplexItem;
      if (
        complexItem.variations &&
        complexItem.variations.length > 0 &&
        !selectedVariation
      ) {
        setHasError(true);
        variationsRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      variation = complexItem.variations?.find(
        (v) => v.id.toString() === selectedVariation,
      );

      const requiredGroups =
        complexItem.optionGroups?.filter((group) => group.required) || [];
      for (const group of requiredGroups) {
        if (!selectedOptions.some((option) => option.groupId === group.id)) {
          setHasError(true);
          optionGroupRefs.current[group.id]?.scrollIntoView({
            behavior: "smooth",
          });
          return;
        }
      }
    }

    setHasError(false);
    onAddToBasket({
      ...item,
      variation,
      selectedOptions,
    });
    onClose();
  };

  const handleOptionToggle = (
    groupId: number,
    optionId: string,
    limit: number | null | undefined,
  ) => {
    setSelectedOptions((prev) => {
      const groupOptions = prev.filter((o) => o.groupId === groupId);
      const exists = groupOptions.some((o) => o.optionId === Number(optionId));
      const effectiveLimit = limit === undefined ? 1 : limit;

      if (exists) {
        return prev.filter(
          (o) => !(o.groupId === groupId && o.optionId === Number(optionId)),
        );
      }

      if (effectiveLimit === 1 || effectiveLimit === null) {
        return [
          ...prev.filter((o) => o.groupId !== groupId),
          { groupId, optionId },
        ];
      }

      if (groupOptions.length < effectiveLimit) {
        return [...prev, { groupId, optionId }];
      }

      return prev;
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      data-qa="item-selector-dialog"
    >
      <DialogContent
        className="select-none sm:max-w-[500px]"
        data-qa="item-selector-dialog-content"
      >
        <DialogHeader data-qa="item-selector-dialog-header">
          <DialogTitle
            className="text-2xl font-bold"
            data-qa="item-selector-title"
          >
            {item.name}
          </DialogTitle>
          <DialogDescription
            className="text-base"
            data-qa="item-selector-description"
          >
            {item.description}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea
          className="max-h-[60vh] pr-4"
          data-qa="item-selector-scroll-area"
        >
          <div
            className="space-y-6"
            data-qa="item-selector-content"
          >
            {item.type === "complex" && (
              <>
                {(item as ComplexItem).variations && (
                  <VariationGroup
                    variations={(item as ComplexItem).variations || []}
                    selectedVariation={selectedVariation}
                    setSelectedVariation={setSelectedVariation}
                    hasError={hasError}
                    ref={variationsRef}
                    data-qa="variation-group"
                  />
                )}
                {(item as ComplexItem).optionGroups &&
                  (item as ComplexItem).optionGroups?.map(
                    (group: OptionGroupType) => (
                      <OptionGroup
                        key={group.id}
                        group={group}
                        selectedOptions={selectedOptions}
                        handleOptionToggle={handleOptionToggle}
                        hasError={hasError}
                        ref={(el) => (optionGroupRefs.current[group.id] = el)}
                        data-qa={`option-group-${group.id}`}
                      />
                    ),
                  )}
              </>
            )}
          </div>
        </ScrollArea>
        <Separator
          className="my-4"
          data-qa="item-selector-separator"
        />
        <DialogFooter data-qa="item-selector-footer">
          <Button
            variant="outline"
            onClick={onClose}
            data-qa="item-selector-cancel-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToBasket}
            className="bg-primary hover:bg-primary/90"
            data-qa="item-selector-add-button"
          >
            Add to Basket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface VariationGroupProps {
  variations: Variation[];
  selectedVariation: string;
  setSelectedVariation: (value: string) => void;
  hasError: boolean;
}

const VariationGroup = React.forwardRef<HTMLDivElement, VariationGroupProps>(
  ({ variations, selectedVariation, setSelectedVariation, hasError }, ref) => {
    return (
      <div
        className="space-y-4"
        ref={ref}
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Variation</h3>
          <span className="text-sm font-medium">Required</span>
        </div>
        <RadioGroup
          value={selectedVariation}
          onValueChange={setSelectedVariation}
        >
          {variations.map((variation) => (
            <VariationItem
              key={variation.id}
              id={`variation-${variation.id}`}
              name={variation.name}
              price={variation.price}
              isSelected={selectedVariation === variation.id.toString()}
              onChange={() => setSelectedVariation(variation.id.toString())}
              isRequired={hasError && !selectedVariation}
            />
          ))}
        </RadioGroup>
      </div>
    );
  },
);
VariationGroup.displayName = "VariationGroup";

interface OptionGroupProps {
  group: OptionGroupType;
  selectedOptions: SelectedOption[];
  handleOptionToggle: (
    groupId: number,
    optionId: string,
    limit: number | null | undefined,
  ) => void;
  hasError: boolean;
}

const OptionGroup = React.forwardRef<HTMLDivElement, OptionGroupProps>(
  ({ group, selectedOptions, handleOptionToggle, hasError }, ref) => {
    const isRadio =
      group.limit === undefined || group.limit === 1 || group.limit === null;

    return (
      <div
        className="space-y-4"
        ref={ref}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {group.name}
            {group.limit !== null &&
              group.limit !== undefined &&
              group.limit > 1 &&
              ` (max ${group.limit})`}
          </h3>
          {group.required && (
            <span className="text-sm font-medium">Required</span>
          )}
        </div>
        {isRadio ? (
          <RadioGroup
            value={
              selectedOptions.find((o) => o.groupId === group.id)?.optionId
            }
            onValueChange={(value) =>
              handleOptionToggle(group.id, value, group.limit)
            }
          >
            {group.options.map((option) => (
              <RadioOptionItem
                key={option.id}
                id={`option-${group.id}-${option.id}`}
                name={option.name}
                description={option.description}
                ingredients={option.ingredients}
                price={option.price}
                isSelected={selectedOptions.some(
                  (o) =>
                    o.groupId === group.id &&
                    o.optionId === option.id.toString(),
                )}
                onChange={() =>
                  handleOptionToggle(
                    group.id,
                    option.id.toString(),
                    group.limit,
                  )
                }
                isRequired={
                  hasError &&
                  group.required &&
                  !selectedOptions.some((o) => o.groupId === group.id)
                }
              />
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-2">
            {group.options.map((option) => (
              <CheckboxOptionItem
                key={option.id}
                id={`option-${group.id}-${option.id}`}
                name={option.name}
                description={option.description}
                ingredients={option.ingredients}
                price={option.price}
                isSelected={selectedOptions.some(
                  (o) =>
                    o.groupId === group.id &&
                    o.optionId === option.id.toString(),
                )}
                onChange={() =>
                  handleOptionToggle(
                    group.id,
                    option.id.toString(),
                    group.limit,
                  )
                }
                isRequired={
                  hasError &&
                  group.required &&
                  !selectedOptions.some((o) => o.groupId === group.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
OptionGroup.displayName = "OptionGroup";

interface VariationItemProps {
  id: string;
  name: string;
  price: number;
  isSelected: boolean;
  onChange: () => void;
  isRequired: boolean;
}

function VariationItem({
  id,
  name,
  price,
  isSelected,
  onChange,
  isRequired,
}: VariationItemProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-between space-x-2 rounded-lg border p-4 transition-colors",
        isSelected ? "border-primary bg-primary/10" : "hover:bg-gray-100",
        !isSelected && isRequired && "border-orange-500",
      )}
      onClick={onChange}
    >
      <div className="flex flex-1 items-center space-x-2">
        <RadioGroupItem
          value={id}
          id={id}
          className={cn(
            "border-2",
            isSelected ? "border-primary bg-primary" : "border-gray-300",
            "focus:ring-primary",
          )}
        />
        <Label
          htmlFor={id}
          className="flex-1 cursor-pointer"
        >
          {name}
        </Label>
      </div>
      <span className="whitespace-nowrap font-semibold">
        €{price.toFixed(2)}
      </span>
    </div>
  );
}

interface OptionItemProps {
  id: string;
  name: string;
  description?: string;
  ingredients?: string;
  price?: number;
  isSelected: boolean;
  onChange: () => void;
  isRequired: boolean;
}

function RadioOptionItem({
  id,
  name,
  description,
  ingredients,
  price,
  isSelected,
  onChange,
  isRequired,
}: OptionItemProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-between space-x-2 rounded-lg border p-4 transition-colors",
        isSelected ? "border-primary bg-primary/10" : "hover:bg-gray-100",
        !isSelected && isRequired && "border-orange-500",
      )}
      onClick={onChange}
    >
      <div className="flex flex-1 items-center space-x-2">
        <RadioGroupItem
          value={id}
          id={id}
          className={cn(
            "border-2",
            isSelected ? "border-primary bg-primary" : "border-gray-300",
            "focus:ring-primary",
          )}
        />
        <Label
          htmlFor={id}
          className="flex-1 cursor-pointer"
        >
          <div>{name}</div>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {ingredients && (
            <p className="text-xs text-gray-400">{ingredients}</p>
          )}
        </Label>
      </div>
      {price !== undefined && (
        <span className="whitespace-nowrap font-semibold">
          +€{price.toFixed(2)}
        </span>
      )}
    </div>
  );
}

function CheckboxOptionItem({
  id,
  name,
  description,
  ingredients,
  price,
  isSelected,
  onChange,
  isRequired,
}: OptionItemProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-between space-x-2 rounded-lg border p-4 transition-colors",
        isSelected ? "border-primary bg-primary/10" : "hover:bg-gray-100",
        !isSelected && isRequired && "border-orange-500",
      )}
      onClick={onChange}
    >
      <div className="flex flex-1 items-center space-x-2">
        <Checkbox
          id={id}
          checked={isSelected}
          onCheckedChange={onChange}
          className={cn(
            "border-2",
            isSelected ? "border-primary bg-primary" : "border-gray-300",
            "focus:ring-primary",
          )}
        />
        <Label
          htmlFor={id}
          className="flex-1 cursor-pointer"
        >
          <div>{name}</div>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {ingredients && (
            <p className="text-xs text-gray-400">{ingredients}</p>
          )}
        </Label>
      </div>
      {price !== undefined && (
        <span className="whitespace-nowrap font-semibold">
          +€{price.toFixed(2)}
        </span>
      )}
    </div>
  );
}
