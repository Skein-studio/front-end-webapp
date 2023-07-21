## MVP TO-DO
sorted by decreasing importance going downwards.

#### Bigger Picture Stuff
* Refactor current frontend code into the updated model.
* Playback of signals should actually play the output of the parent node.


#### Front End Stuff
##### To-Do:
* Merge "split" and "merge" from branch
* Remove "This content is outside..."
* Should you be able to continuously create signal nodes from a single signal node?
* The compute/play/pause button is not in the larger view.
* The playback inside the source node is a different player than the signal. Perhaps just remove the source player for now.
* Make handles larger
* Styling check for texts and stuff inside nodes.
    - The "compute for 3 tokens" text should fit more neatly inside the progress bar.
    - The "source[undefined]" label looks a bit scuffed, remove [undefined].
    - The text after generating sounds in the source node is center-aligned instead of left-aligned. It is also the color white.
    - The white background.
    - Style Edit inside the signal node. Should there be a "set" button or something similar?
* Increase playback of progress from 1fps. This used to be smoother, but it might have 
    been very inefficient.
* Map and items in corner should change placement if screen is too narrow.
* When in a large view of a node, you should be able to return to the canvas by just clicking on the side.
    
##### Bugs:
* Signals that are computed gets "uncomputed" a new node is created.
* Multiple edges created from a single "movement"
This is happens for many more cases, any new node in fact.
    1. Create signal node
    2. Click "+" to create 1 merge and 1 split
    3. Connect signal and merge
    4. Two edges are created (signal - merge, signal, split)
* When importing a file in a source node, the name of it appears as [object File] instead of the actual name.
*  Adding new handle after connecting one does not update the location of the edge [still a bug?].
*  Connecting handle to a merge node removes the old state [still a bug?].



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
