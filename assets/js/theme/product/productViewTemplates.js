import _ from 'lodash';

export default {
  priceWithoutTax: _.template(`
    <% if (price.rrp_without_tax) { %>
      <span class="price-rrp"><%= price.rrp_without_tax.formatted %></span>
    <% } %>

    <% if (price.without_tax) { %>
      <span class="price-value"><%= price.without_tax.formatted %></span>

      <% if (price.with_tax && price.without_tax) { %>
        <span class="price-tax-label"><%= excludingTax %></span>
      <% } %>
    <% } %>
  `),

  priceWithTax: _.template(`
    <% if (price.rrp_with_tax) { %>
      <span class="price-rrp"><%= price.rrp_with_tax.formatted %></span>
    <% } %>

    <% if (price.with_tax) { %>
      <span class="price-value"><%= price.with_tax.formatted %></span>

      <% if (price.with_tax && price.without_tax) { %>
        <span class="price-tax-label"><%= includingTax %></span>
      <% } %>
    <% } %>
  `),

  priceSaved: _.template(`
    <% if (price.saved) { %>
      <%= savedString %>
    <% } %>
  `),

  variationThumbnail: _.template(`
    <span class="product-thumbnail" data-image-thumb data-high-res="<%= mainImageUrl %>">
      <img src="<%= thumbImageUrl %>">
    </span>
  `),
};
