# SMP Islam Terpadu Darul Ilmi

Static, responsive school profile website for **SMP Islam Terpadu Darul Ilmi**, part of **Yayasan Baitul Akbar Parabek**.

## Project structure

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── .gitignore
└── README.md
```

## Features

- Responsive layout for desktop, tablet, and mobile
- Animated page loader, scroll progress, reveal effects, counters, hover states, and hero tilt interaction
- Mobile navigation with active section tracking
- Interactive program tabs and rotating testimonials
- Foundation profile for TK, SD, and SMP Islam Terpadu
- B accreditation highlight and school location details
- Registration CTAs connected to a Google Forms placeholder

## Run locally

No build step is required. Open `index.html` directly, or serve the project with any static server:

```bash
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Replace the registration form

The current registration URL is an example placeholder:

```text
https://forms.gle/EXAMPLE_DARUL_ILMI_PENDAFTARAN
```

Replace it in `index.html` with the official Google Forms URL. Registration links appear in the announcement bar, navigation, hero, and closing CTA.

## School details

- **Foundation:** Yayasan Baitul Akbar Parabek
- **Unit:** SMP Islam Terpadu Darul Ilmi
- **Accreditation:** B
- **Address:** Jl. Lengkong Gudang Timur No.52, Kec. Serpong, Kota Tangerang Selatan, Prov. Banten
