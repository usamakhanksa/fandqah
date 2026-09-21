# Editorial photography — provenance and licence

All photographs below are from **Pexels** and are covered by the
[Pexels Licence](https://www.pexels.com/license/): free to use for commercial
purposes, no attribution required, modification permitted. They are **not**
Fandaqah-owned imagery and are **not** photographs of Fandaqah customers,
properties or staff. They are used as generic editorial illustration of
property types and of the Saudi market.

| File stem | Pexels photo | Used for |
|---|---|---|
| `hotel-reception-lobby` | pexels.com/photo/14036253 | "Hotels & Resorts" segment card |
| `serviced-apartment-corridor` | pexels.com/photo/11665693 | "Serviced Apartments" segment card |
| `chalet-pool-terrace` | pexels.com/photo/18884372 | "Chalets & Tourist Units" segment card |
| `riyadh-skyline` | pexels.com/photo/15839821 | Editorial band (Kingdom Centre, Riyadh) |
| `gulf-resort-pool` | pexels.com/photo/16849865 | Closing CTA ground |
| `jeddah-albalad` | pexels.com/photo/10965740 | About page band (Jeddah Al-Balad rawasheen) |

## If you replace these with real Fandaqah photography

Drop the new originals into `lab/photo/` using the same file stems
(`src-<stem>.jpg`) and run:

```
node build/photos.mjs && node build/build.mjs
```

Nothing else needs to change: the markup references the stems, not the files.
Real photographs of real Fandaqah properties would be better than any of these,
and the alt text should then be rewritten to describe the actual property.

## Searched and rejected wholesale

A second sourcing round for the Features and About pages was largely abandoned
rather than settled for:

- **Housekeeping** returned cleaning products on a shelf, a child vacuuming a
  family living room, toilet rolls and rubber gloves. None is hotel housekeeping.
- **Office and meeting** returned generic Western stock boardrooms, which is
  exactly the repetitive stock photography the brief rules out, and carries no
  Saudi relevance.
- **Concierge** returned a waiter with a coffee tray and a period-costume bellhop.
- **Regional architecture** returned mostly mosques. Using religious architecture
  to sell software would be tacky, so none was used.

The Features page therefore carries **no stock photography of people at all**.
It is a product page, so it leads with the product: three interface readouts
drawn in markup and CSS. See "Module readouts" in `assets/css/fandaqah-pages.css`.

## Rejected, and why

Two candidates were discarded deliberately: an apartment tower (cold cast, bad
crop) and a close portrait of hospitality staff (an identifiable individual who
has no connection to Fandaqah, which reads as an implied endorsement).

Images found in a general web image search were not used. Almost all of them are
someone else's copyrighted work, and `prompt.txt` §4 forbids presenting
copyrighted assets as Fandaqah's own.
