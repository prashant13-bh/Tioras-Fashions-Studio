const ECOMMERCE_API_URL =
  process.env.NEXT_PUBLIC_ECOMMERCE_API_URL ||
  "https://api-ecommerce.hostinger.com";
const ECOMMERCE_STORE_ID =
  process.env.NEXT_PUBLIC_ECOMMERCE_STORE_ID ||
  "store_01KPJ7YMFMNFJ7TMCT785XG9H5";

/* ── helpers ── */

export const formatCurrency = (priceInCents, currencyInfo) => {
  if (!currencyInfo || priceInCents === null || priceInCents === undefined)
    return "";
  const { code, symbol, template } = currencyInfo;
  const currencyDisplay = symbol || code || "₹";
  const amount = (priceInCents / 100).toFixed(2);
  if (template) return template.replace("$1", amount);
  return `${currencyDisplay}${amount}`;
};

const extractVariantOptions = (options) =>
  (options || []).map((o) => ({
    id: o?.id || "",
    option_id: o?.option_id || "",
    variant_id: o?.variant_id || "",
    value: o?.value || "",
  }));

const extractProductOptions = (options) =>
  (options || []).map((o) => ({
    id: o?.id || "",
    title: o?.title || "",
    values: (o?.values || []).map((v) => ({
      id: v?.id || "",
      option_id: v?.option_id || "",
      variant_id: v?.variant_id || "",
      value: v?.value || "",
    })),
  }));

const extractVariants = (variants) =>
  (variants || []).map((v) => {
    const price_in_cents = v?.prices?.[0]?.amount || 0;
    const sale_price_in_cents = v?.prices?.[0]?.sale_amount || null;
    const currency = v?.prices?.[0]?.currency_code || "inr";
    return {
      id: v?.id || "",
      title: v?.title || "",
      image_url: v?.image_url || null,
      sku: v?.sku || null,
      price_in_cents,
      sale_price_in_cents,
      currency,
      currency_info: v?.prices?.[0]?.currency,
      price_formatted: formatCurrency(price_in_cents, v?.prices?.[0]?.currency),
      sale_price_formatted: formatCurrency(
        sale_price_in_cents,
        v?.prices?.[0]?.currency
      ),
      manage_inventory: v?.manage_inventory || false,
      weight: v?.weight || null,
      options: extractVariantOptions(v?.options),
      inventory_quantity: v?.inventory_quantity || null,
    };
  });

const extractImages = (images) =>
  (images || []).map((img) => ({
    url: img?.url || "",
    order: img?.order || 0,
    type: img?.type || "",
  }));

const extractCollections = (collections) =>
  (collections || []).map((col) => ({
    product_id: col?.product_id || "",
    collection_id: col?.collection_id || "",
    order: col?.order || 0,
  }));

const extractAdditionalInfo = (info) =>
  (info || []).map((i) => ({
    id: i?.id || "",
    order: i?.order || 0,
    title: i?.title || "",
    description: i?.description || "",
  }));

const extractCustomFields = (fields) =>
  (fields || []).map((f) => ({
    id: f?.id || "",
    title: f?.title || "",
    is_required: f?.is_required || false,
  }));

const extractRelatedProducts = (related) =>
  (related || []).map((r) => ({
    id: r?.id || "",
    section_title: r?.section_title || "",
    related_type: r?.related_type || "",
    related_id: r?.related_id || "",
    position: r?.position || 0,
  }));

const getLowestPriceVariant = (product) =>
  product.variants.reduce((acc, curr) => {
    const accPrice = acc.prices[0]?.sale_amount || acc.prices[0]?.amount || 0;
    const currPrice =
      curr.prices[0]?.sale_amount || curr.prices[0]?.amount || 0;
    return accPrice < currPrice ? acc : curr;
  });

const getProductPrice = (product) => {
  const selectedVariant =
    product.site_product_selection === "lowest_price_first" ||
    product.site_product_selection === null
      ? getLowestPriceVariant(product)
      : product.variants[0];
  const price_in_cents =
    selectedVariant?.prices[0]?.sale_amount ||
    selectedVariant?.prices[0]?.amount ||
    0;
  const currency = selectedVariant?.prices[0]?.currency_code || "inr";
  return { price_in_cents, currency };
};

const mapProduct = (product) => {
  const { price_in_cents, currency } = getProductPrice(product);
  return {
    id: product.id,
    title: product.title,
    subtitle: product.subtitle,
    ribbon_text: product.ribbon_text,
    description: product.description,
    image: product.thumbnail,
    price_in_cents,
    currency,
    purchasable: product.purchasable,
    order: product.order,
    site_product_selection: product.site_product_selection,
    images: extractImages(product.images || product.media),
    options: extractProductOptions(product.options),
    variants: extractVariants(product.variants),
    collections: extractCollections(product.product_collections),
    additional_info: extractAdditionalInfo(product.additional_info),
    type: { value: product.type?.value || "" },
    custom_fields: extractCustomFields(product.custom_fields),
    related_products: extractRelatedProducts(product.related_products),
    updated_at: product.updated_at,
    created_at: product.created_at,
    deleted_at: product.deleted_at,
    metadata: product.metadata,
  };
};

/* ── API calls ── */

export async function getProducts(params = {}) {
  const qp = new URLSearchParams();
  if (params.ids) params.ids.forEach((id) => qp.append("ids[]", id));
  if (params.offset) qp.append("offset", String(params.offset));
  if (params.limit) qp.append("limit", String(params.limit));
  if (params.order) qp.append("order", String(params.order).toUpperCase());
  if (params.sort_by) qp.append("sort_by", String(params.sort_by));
  if (params.is_hidden) qp.append("is_hidden", String(params.is_hidden));
  if (params.to_date) qp.append("to_date", String(params.to_date));

  const qs = qp.toString();
  const url = `${ECOMMERCE_API_URL}/store/${ECOMMERCE_STORE_ID}/products${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();

  return {
    count: data.count,
    offset: data.offset,
    limit: data.limit,
    products: data.products.map(mapProduct),
  };
}

export async function getProduct(id, params = {}) {
  const qp = new URLSearchParams();
  if (params.field) qp.append("field", String(params.field));

  const qs = qp.toString();
  const url = `${ECOMMERCE_API_URL}/store/${ECOMMERCE_STORE_ID}/products/${id}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return mapProduct(data.product);
}

export async function getProductQuantities({ fields, product_ids }) {
  const qp = new URLSearchParams();
  qp.append("fields", fields);
  product_ids.forEach((id) => qp.append("product_ids[]", id));

  const url = `${ECOMMERCE_API_URL}/store/${ECOMMERCE_STORE_ID}/variants?${qp.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();

  return {
    variants: (data.variants || []).map((v) => ({
      id: v.id,
      inventory_quantity: v.inventory_quantity,
    })),
  };
}

export async function getCategories() {
  const url = `${ECOMMERCE_API_URL}/store/${ECOMMERCE_STORE_ID}/collections`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();

  return {
    categories: (data.collections || []).map((c) => ({
      id: c.id,
      title: c.title,
      image_url: c.image_url,
      store_id: c.store_id,
      created_at: c.created_at,
      updated_at: c.updated_at,
      deleted_at: c.deleted_at,
      metadata: c.metadata,
    })),
    count: data.count,
  };
}

async function getCheckoutLanguage() {
  const res = await fetch(
    `${ECOMMERCE_API_URL}/store/${ECOMMERCE_STORE_ID}/settings`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return data.store_owner?.language;
}

export async function initializeCheckout({
  items,
  successUrl,
  cancelUrl,
  locale,
  customer,
}) {
  const url = `${ECOMMERCE_API_URL}/store/${ECOMMERCE_STORE_ID}/checkout`;
  const [response, language] = await Promise.all([
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        successUrl,
        cancelUrl,
        locale,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        customer,
      }),
    }),
    getCheckoutLanguage().catch(() => "en"),
  ]);
  if (!response.ok)
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  const data = await response.json();
  return {
    url: `${data.url}&lang=${language?.toLowerCase() || "en"}`,
  };
}
