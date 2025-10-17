# Portfolio

This is a modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Mode**: Theme toggle functionality
- **Smooth Animations**: Framer Motion animations throughout
- **Interactive Components**: 3D effects, magnetic icons, and more
- **Contact Form**: Functional contact form using EmailJS
- **Modern UI**: Clean, professional design with gradients and effects

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up EmailJS for the contact form:
   - Create a free account at [EmailJS](https://www.emailjs.com/)
   - Create a new email service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `{{from_name}}`
     - `{{from_email}}`
     - `{{subject}}`
     - `{{message}}`
     - `{{to_name}}`
   - Copy your Service ID, Template ID, and Public Key

4. Create a `.env.local` file in the root directory and add your EmailJS credentials:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **EmailJS**: Email service for contact form
- **Radix UI**: Accessible UI components
- **Lucide React**: Icon library

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Page-specific components
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...                   # Configuration files
```

## Deployment

This project can be deployed on Vercel, Netlify, or any other platform that supports Next.js.

For Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy!

## Customization

- Update personal information in the components
- Modify colors and themes in `tailwind.config.js`
- Add new sections or features as needed
- Customize the EmailJS template for different email formats

## License

This project is open source and available under the [MIT License](LICENSE).
