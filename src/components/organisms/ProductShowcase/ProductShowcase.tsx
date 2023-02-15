import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../atoms/Container/Container";
import TextTitle from "../../atoms/TextTitle/TextTitle";
import TextBody from "../../atoms/TextBody/TextBody";
import Button from "../../atoms/Button/Button";
import SingleSelectDropdown from "../../molecules/SingleSelectDropdown/SingleSelectDropdown";
import ProductImageViewer from "../../molecules/ProductImageViewer/ProductImageViewer";
import FormField from "../../molecules/FormField/FormField";
import { ProductShowcaseContainer } from "./ProductShowcase.style";
import type { DropdownOption } from "../../molecules/DropdownList/DropdownList";

type Props = {
  name: string;
  images: string[];
  price: number;
  colors?: string[];
  sizes?: string[];
  onAddToCart: ({ color, size }: { color?: string; size?: string }) => void;
};

type FormFieldKeys = "color" | "size";

type FormErrors = {
  color: string[];
  size: string[];
};

const checkHasErrors =
  (errors: FormErrors) =>
  (...fieldNames: FormFieldKeys[]): boolean => {
    // If no field names passed, we want to handle all fields
    const _fieldNames =
      fieldNames.length === 0 ? Object.keys(errors) : [...fieldNames];

    return Object.entries(errors)
      .filter(([key]) => _fieldNames.includes(key))
      .some(([_, errorValues]) => errorValues.length > 0);
  };

const ProductShowcase = ({
  name,
  images,
  price,
  colors,
  sizes,
  onAddToCart,
}: Props) => {
  const { t } = useTranslation(["product", "translation"]);

  const [fieldValues, setFieldValues] = useState<{
    color: DropdownOption | null;
    size: DropdownOption | null;
  }>({ color: null, size: null });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    color: [],
    size: [],
  });
  const [showErrors, setShowErrors] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  const colorOpts = useMemo(
    () =>
      colors?.map((color, index) => ({
        id: `${color}_${index}`,
        value: color,
      })),
    [colors]
  );

  const sizeOpts = useMemo(
    () =>
      sizes?.map((size, index) => ({ id: `${size}_${index}`, value: size })),
    [sizes]
  );

  const handleValidation = useCallback(() => {
    const errors: FormErrors = { color: [], size: [] };

    if (!fieldValues.color) {
      errors.color = [
        `${t("color", { count: 1 })} ${t("required", "", {
          ns: ["translation"],
        })}`,
      ];
    }
    if (!fieldValues.size) {
      errors.size = [
        `${t("size", { count: 1 })} ${t("required", "", {
          ns: ["translation"],
        })}`,
      ];
    }
    setFormErrors(errors);
    if (checkHasErrors(errors)()) throw Error("Validation Error");
  }, [fieldValues, t]);

  const handleSubmit = useCallback(() => {
    try {
      handleValidation();
      onAddToCart({
        color: fieldValues.color?.value,
        size: fieldValues.size?.value,
      });
      setProductAdded(true);
      setShowErrors(false);
    } catch (e) {
      setProductAdded(false);
      setShowErrors(true);
    }
  }, [onAddToCart, fieldValues, handleValidation]);

  const handleFieldUpdate = useCallback(
    (field: FormFieldKeys) => (option: DropdownOption | null) => {
      setFieldValues((prev) => ({ ...prev, [field]: option }));
      setFormErrors((prev) => ({ ...prev, [field]: [] }));
      setShowErrors(false);
      setProductAdded(false);
    },
    []
  );

  useEffect(() => {
    try {
      showErrors && handleValidation();
    } catch (e) {
      setShowErrors(true);
    }
  }, [handleValidation, showErrors, t]);

  return (
    <ProductShowcaseContainer>
      <div className="showcase-wrapper">
        <ProductImageViewer
          images={images.map((image) => ({ src: image, alt: name }))}
        />
        <Container className="showcase-content">
          <Container $width="100%" $mt={8}>
            <TextTitle $size="18px" $uppercase $letterSpacing="3px" as="h2">
              {name}
            </TextTitle>
          </Container>
          <Container $width="100%" $mb={8}>
            <TextBody $size="24px" $bold $letterSpacing={3}>
              ${price}
            </TextBody>
          </Container>

          {colorOpts && (
            <FormField
              label={t("color", { count: 2 })}
              dropdownId="product-color"
              Component={() => (
                <SingleSelectDropdown
                  options={colorOpts}
                  defaultPlaceholder={t("color", { count: 1 }) || undefined}
                  dropdownId="product-color"
                  initialSelectedId={fieldValues.color?.id}
                  handleSelectCallback={handleFieldUpdate("color")}
                  hasError={checkHasErrors(formErrors)("color")}
                />
              )}
              errors={formErrors.color}
            />
          )}
          {sizeOpts && (
            <FormField
              label={t("size", { count: 2 })}
              dropdownId="product-size"
              Component={() => (
                <SingleSelectDropdown
                  options={sizeOpts}
                  defaultPlaceholder={t("size", { count: 1 }) || undefined}
                  dropdownId="product-size"
                  initialSelectedId={fieldValues.size?.id}
                  handleSelectCallback={handleFieldUpdate("size")}
                  hasError={checkHasErrors(formErrors)("size")}
                />
              )}
              errors={formErrors.size}
            />
          )}

          <Button
            $paddingTop="18px"
            $paddingBottom="18px"
            $fontSize="16px"
            text={
              (productAdded
                ? t("addToCartButtonAdded", "", { ns: ["translation"] })
                : t("addToCartButton", "", { ns: ["translation"] })) || ""
            }
            $semiBold
            disabled={productAdded}
            onClick={handleSubmit}
          />
        </Container>
      </div>
    </ProductShowcaseContainer>
  );
};

export default ProductShowcase;
