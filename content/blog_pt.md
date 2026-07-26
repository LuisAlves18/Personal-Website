---
layout: pagina.njk
lang: pt
permalink: /blog/
title: "Blog"
---

# Blog

<div class="grid gap-4 mt-8">
{% for post in collections.blogPt %}
  <a href="{{ post.url }}" class="block bg-surface border border-line rounded-xl p-5">
    <p class="font-heading font-medium text-ink">{{ post.data.title }}</p>
    <p class="text-sm text-ink-soft mt-1">{{ post.data.date | readableDate }}</p>
  </a>
{% endfor %}
</div>
