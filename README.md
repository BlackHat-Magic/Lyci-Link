<div align="center">

# [Lyci.link](https://lyciberi.bhm.gg)

Like Carrd or Linktree but overdesigned, bespoke, and probably underoptimized.

</div>


## Overview

Just a simple dockerfile to build a static webpage that could just as easily be done with Carrd or Linktree.

### Goals

Basically just to waste time.

### Features

- [X] Linktree
- [ ] Link shortener?
- [ ] Pastebin-like?
- [ ] Simple file hosting?

### Software Stack / Technologies Used

- Language: HTML + JavaScript + CSS
- Framework: Alpine.js, Nginx

## Quickstart

```sh
docker buildx build -t lycilink:master .
docker run lycilink:master	# tries to bind to port 80
```

