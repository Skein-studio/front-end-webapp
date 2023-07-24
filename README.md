## MVP TO-DO
sorted by decreasing importance.

#### Bigger Picture Stuff
* Refactor current frontend code into the updated model.
* Playback of signals should actually play the output of the parent node.


#### Front End Stuff
##### To-Do:
* Styling check for texts and stuff inside nodes.
    - The "compute for 3 tokens" text should fit more neatly inside the progress bar.  (??)
    - The text after generating sounds in the source node is center-aligned instead of left-aligned. It is also the color white. (what should it be?)
    - The white background. (??)
    - Style Edit inside the signal node. Should there be a "set" button or something similar? 
* Map and items in corner should change placement if screen is too narrow.
* When in a large view of a node, you should be able to return to the canvas by just clicking on the side.
    
##### Bugs:

###### Source Node

###### Signal Node
* Signals that are computed gets "uncomputed" a new node is created.
* Signal nodes only appear from the first output handle. (?)

###### Merge Node
* For merge node handles, standard is one input, but when that one is connected -
    a new handle appears next to it.
* The handle state is not functional at the moment.
    - you cannot connect more than one edge
*  Adding new handle after connecting one does not update the location of the edge.
*  Connecting handle to a merge node removes the old state.
[Above stuff will all be remade]

###### Split Node
* When connecting two edges from a split output, you cannot do it again until you update the state manually.
    - I think you need the "reload component" or something similar to fix this.
[Above stuff will all be remade]


___________________
Node.js stuff below
___________________
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
