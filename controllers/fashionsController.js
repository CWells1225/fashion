const express = require('express')
const router = express.Router()
const Fashions = require('../models/fashions')


router.get('/seed', async (req, res) => {
	const fashionItem =
		[
			{
				item:'A N K A R A',
				img:'https://i.pinimg.com/564x/67/f1/a1/67f1a13bf2c69eed3db7c0619b993c56.jpg', 
				description: 'Ankara Wear'
			}, 
			{
				item: 'All Black Everything',
				img: 'https://i.pinimg.com/564x/bf/d3/44/bfd344bb882b59f54582fa913d9ad77b.jpg', 
				description: 'Pair your Black Turtleneck and Black Skinny Jeans with a Plaid Coat & Black High Knee Boots'
			}, 
			{
				item:'LEATHER ME DOWN',
				img: 'https://images.liketoknow.it/0b0fd08c-f6a4-11e9-9fed-0242ac110002?v=0&auto=format&fm=jpg&w=450&q=80&dpr=2', 
				description: 'Styled in All Leather'
			}, 
			{
				item:'Casual Strolls',
				img: 'https://i.pinimg.com/564x/8d/b2/dc/8db2dc7446cdae976ad119d4cf4ab0c1.jpg', 
				description: 'Pair your Favorite Graphic Tee w A Denim Jacket & your Favorite Leather Pants'
			}, 
			{
				item:'FIRE & ICE',
				img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGBgaHBoZHBwcGhohGBwhHCEaIRwaHxweJC4lHh8rHxgaJjgmKzAxNTU1HiQ7QDs0Py40NTEBDAwMEA8QHxISHzYrJSw3NDQ0NjQ0NDQ0NDQ0NDE9NDQ0ND00NDQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAPkAygMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCAQj/xABBEAACAQIEAwUGAwcBBwUAAAABAhEAAwQSITEFBkEiUWFxgQcTMpGhsUJS0RQjYpLB4fAVU3KCorLC8RYkM3OT/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAKBEAAgICAgEDBAIDAAAAAAAAAAECEQMSITEiBEFREzJhkYHBM0Jx/9oADAMBAAIRAxEAPwCjcE4cwuhPeBDIDZdYjUyasjWcl/OqC8iQqKylpPXRdZnaqPhsawcETmkz4zV25R421m72QrOdgTuT3+VcrcozTZrhxo23AuWtocmSVHZiMum0dIpyVqB5Z4k94MXYMcqsQIhS2aV07oqw12PsmnaOVrqiikMKKKKACiiikMKKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooA+Xr/A7lt1Vcoc7oQ2dTAMMpE9d60H2dcr2nCviM3vQT+7yFQBvLMR2u/u1FS+H4xax1wt7hQyKAWIGYk9Qw1iBp51oODj3aGI7K/YVjjZqhavVNs5wOBS0CqAAEzAAA+Qp1RRW2NKgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMq5IvsMMmdLYGUsrKZuMG17Y6eFWa1wC9cdLrYm4F/duqa5VCx2YBCn1k0ws8uDBN2GzI+aJHa7O0nqdfCrtgWm2h2lV+1YX3M1/ohYd1dVyBXVbMhRRRSGFFcFtYrjFXciM3cKYhaik7D5lDd4BpSKBhRRFEUgCiiigAooiigAooooAKKKKACiiigAoorlnA3IHrQB1RTdsag/GKT/ANSt/m+hosdFY4xxy3euW0sn3kZizKOyNhudD12q2YBptof4V+1Z1w+wkobS3LaFWGVgAFMKDkNXfA48KiqQdBE+VTjK5M24vVErRUcOKDqv1rpeKKTEH6VvZGaY/opi3E07iflQ3EVjQGekii0LVjw70x43cVbDsxhQpJMxoBXF3iPaVYid6qnP3Es1v3JRmVoYsNIg/f8ApNKUklY9WSPI3HDft5CuqAS2ac3iB0HhVurEOU+KNYuhl7RPZgn9K0+5xrKmd2CqPiMaL31PHkTXI3Hngng4JInUb+FdVleA56ZL1xmm4lxpgwpAAhep6dNKt/DuareIRjaYB1BOR4DmO6DBHlW1ki/cbxSStoslFR/BuIG9bDsuU7MPEbx609a6o6it2To7opnfxZBhFzaTvTR+IXDsoH1pWPVkvQTVefHXWMSR5ClP2R21ZyR11osKJW7jUXdp8taj8NzFad2RAxZTB060zd0ttvOaY2rPW4yoxLvaUIocg9oySeh9danPJrRpRRp2K4qykQAPrTW9xhwpbU7aKBP1pthsKzKHVc2Yd+lMOP27lu0SjIrAicwnSJ2FUTtg0kh9e4vdkBbY1nVnJA9BSuLuNCSqdoCdIIneKzfH8WxIMNeOuWAigb+J2q5cM4S162j++YCBJZpPkBp1ptP2Eml2PrhAcpEgV1l/yKUGBKqEbESizEZQ5J6Ztyacf6ev+0/5hWliddmHl/BXb2KZ2w4OePdm4ZEAs0GIjfcRU5wdw6gMQGAErOomYkelKcUvBltklAyk5lUyFOWSJ6xp3b0+4PhENtXAEtqzD8R2ny0rnUfI6HLxQ3bDRJMQJiKQZCfw1Nthe46d1DWTpVNTGyIgYWTHfSl+EBEHTuGtPnwhOXpE02t3SbzW2BMiVPQREilrQ7I4uxZWB0gjXcGs+5mxb5yXJK5gFEnXXu6a1qF/hbaFWgyT4GqJ7Q8IqPYzA53IBy/DuPrPWpzi6BNFQwTKWPZIIJJ+e00/5w4yWw9jDhgCBneCdR+AGBrGu/dSvC+HKzu9wQFYiJ+Ig6R41XONYi2cTaLKotA5TE5SO18RnvI+tSgvJ0USa5GCXO9v8+dP8Fjcjq6nVdRtXJ4Sga6nZZsudCDIkEHLOsg6fzVZ+F4WzkGZkAbOqnIBlDGYYncwwXKe4inKKLxcumWHlvjgtIrKHYNmcjMCCWOusd9R2M5vx2ZlkAEn4bcwOkGm3DMQjDssHKErKiFIUlcwG2Xs9O8VI5vpV8WTVfJyZMd/gb/61xFEW52wj6BvdrBpzw7DcWvhXDlEYfE3uxp0MAEx6Uyx+KvABFclCQSm4BB+YrQuUcXnw6qYzJ2WH2PqIq6zJ+yIvE0rtkInLGPy648h4jS2pX6600xnL2Ot6nHXGUxMKqkbd+/9qvuIvKil3IVQJJOwqhczczSAVkLMDefOB1rM82sbaX6NQxbOrEv9H1l8Q0zPxax3aU0PLFk6reYNvvA8BUGb166+VFZiQSq5lDsBqSqk5m26DpRadwxDZ1IOqkmQfEHbeuF+pkuaO1enjLiyX/0DG51AxT+7U6n3hBC9QANzG1R3DecGV7iW0SFchGuBmuEARJZjM6E+tT3C8cZgn+9VrnvhQQjE2hlaZYCdx19avj9V9RavghP0+jtHo4Y+PxhDXEUum8EAEARlC9Y+1S2J9mt9ElcQjQPhJdVJ7wcxg+lP/Z3bsXG9+Xi6AAEJAiVGo796vXFnQWLhuEBMjZvKDXXHJKKSs5pY4t2YHd4VfRyjoJAyntyCe+R96nrfIeNIBy29QPxH9Kb8uqLlxEgQzqI6wSJHymtuFtRpFCzy+QlhiU65wwJcRzM3EOfU5S0CdCY2H0q28II90sCABEepqAxnGLd4oiSSJY6baRH1pO5zKthPdkfvAug6azsa50vNlW/BFwmgGqKnOhbKoQzEHz76lLfMiC2XYnQhdt9KrqyeyLFfvZR1M6ADc+QquYnFql3MHPaYSDpuI1nbbbrTLivNyZMqhgSJDdR5dxquX8arhLsszJOdS0k6SCR51mTS4GuTUFvBohgT3SKovOVz3lxAjFFtyWmIJ2G+siDTPl3iJOd1BkkwQRAnpFM76Mwdl7RzHcgk9K5suWonRhxqT5GeH7akKGAJgEx3/FOYGfL5UlxLltDZcMMxgsCdx1MHSoW7xh7LBlRMwYhgV7Y7oM6aVN8I4q99S5AAmQJ1jaD0muR7x8kdjUXwV1cP7pUu7IOvQA6H+nrU7gcbadVVRnN45QcxgMJ/CGEaA9D5VWcdxAZGtsuUklUTOrGSxgwpMBfHfQDwnlt2sNbt31sCSMuY6NJG8wek1dpxXPZhTi349HGmFxCKohWfaOyATqNtBrtVouJK51UxJB7vMfpVJxPFziXQKhIkFpaFMdxGvXarq2J/9s7K0kDpsPAVLeUO+zcoKS4GF25vFOuF8YfDOHAzCIdfzDwnr3VALhsRfAe2VynQ9oaEbyKRHCsUVBzrBJ3fuNdUHaTOSUabiyT4vzrexFxlKRZB7AU9qe9x1Pd3VEYjHKbiq7wgYFyQSSo7RUD8xKhR4kU6w/LN5gHd0RRqSDJ9KmuYuEqMMiKrlJBaHRZEanUGeupNUkrfJmPiuBtwzGILxxCoFv3AYvEMWmMpyozFRKgaweugmKqXO3HL7YgBnkoqjMFCs25GcDskjMdgNDU3iMf7jKj53zfBccgppoqgqSJAjSqDxbEl7zsxk5iPlp/SpwTcueimbVQTj3fsTPLvMj27iLcYshIBJ3WSBM9wE1d+bsYGW3aQyc4zxtEdfCazDhOH95eRIBBMmTAgamT02rTMTw1RZzpM9kMM2eIiCG7orTxx3VcE45JODvkpuPxWRlykgqquYka7Dy2p/d5sxb2jhb1wsgIOsZiNwC25Ap5icOj+77IMouYR3EgVzc4bbZyzgHQDTT1qy4i22SablSGfBOKjD3kuntBGDEd8VqY9peB/O48Pdvp9Kot/lzDKBo3wz8XjVdxfAUzvEgZmgdwkxWXJD1ZpHDbgfESNFyADxp04RrpYozvqF2iFH/mmliy+dSq9krlImD4ml+J50UFGClSYiM0RBJNKLvIwkqxoaYXEK92UtgZlO+kFTGnfvXd3h14WSrFRLhlWdT0prbsQAVJBOo12muLqbAudyepq21EdbPbWFLOwdVIRe8CQNSAe+opsAhuh7dwZO0JGqCN1J6nUUqzEk9oxJ9e+vMfhbmbN7sKMoyhRlXYfeKnk58kOKp0TXBDCBZQlnJYgSVAEBPKda8OF91cuIYIc50MEaHcehFMeD8Rt2uwwJJGaOnz660/41jc6tcUDPbUaLsAes9f7VxykpWn2d0IyilXRUOL4IPcZXbKTENHZB1EGas3AuHWMhQAEQQ0H/O+vcLct4pCiZZiSxGgbx6zSXDcN+zO65ewVBBGgBH2GpFc8rSXPCOlPa1XJnfHL1yxfe2hgAwGyrnZekuBmII8amsZxa+cMlsoSxaZjQRGVRHhrUHxa6rYztTlzjMPXWO6fCtJwCJfdYAypPTTUD+orpyyaUbVnNiitpEZy9gGhSwknSdIHz61c8Bw0OCumRSM3n3RTC7iLdtGeYg5de+Y+9OOW2fI90nsOZC9Z2J+3yrmhHafkdE5PW0NOJ8OWw7PblQYlfw+Y7t6gcru6oiz23A7quT2lxDi1czZHMdlirfzClOM8DwuBwz3UBR12dmd3JJHZGYneKvCCktovhWRlkp6tcsi8baNi3aRpdfxhYljpCiek9TTfF4oXUBOHZVMiHuDY9conykxGbY0xtcy2L721OYsusajXUCe7v+W1TD3M+VLQ90ZGy6EA669xAIjfWqbexjUrnMWEUcOvKqlcjBoYyRDCCCB3R/4rKmJOp+dbF7QsQVwTq5GZ8oACgbMNhWTcKsq962jfCzKp9SKtj6IZOyw8E4QihHd27UGEVTppIYk6aHu6GtV4EyMhtqsowbtlszSZmdND9PGojF4AJlQLoFB1Uldj36T4U/4YrKoCgz10jSNPTw8Kg5PbktGKrgjOMcuthxbuZg6aqCARBJJGYeR+lVu88l5O4EVqS8QtXLIR8rKwiN5/v3eVUC7y7da6yJbcqQVDRpGusnSuiMlKLSMOLjJOR1xG9CLr+Ax36EVX7mI1Op3NaZgOTOyucKvZKk7sZ+lSX/ojD/lb51l45BHJFFD5T4w965cdvhUAKPPvNSmLxU5ioUFjJbrp4elPOFckXrSFYQGTMMde47daXPJ+I/g2J+I7/l238dq1CLXJJy4oaPxGYfIsgEQdtRpTXEpnCtoCAJjrUrg+WsSxZGCoIGpII13iOseVLYnlC8CcjI4gbkqe7aD96ozCK1j0DhIVEymWie34Gm167euPlBhD2TB0AWI08qtD8o4kSewYiAG+LykaR41H3OA4lGCmwxz5hmVlMaazB030qc1aNRqxseDWYDE9pRpqRAnXbxqJ5kxhsoWSIcBXg7dx8aRx+He27KrMMpKkN/DoRr0/Wq1jkd0ZmYR4anSY0HnXBGLc02ek6UeBxwPmJsPdEgBGYZj3bSflVx4jx+2V+ME+Bkx1/rVFw+CV7eZjrAP0pnwTDhnAJ0J+WtUnGEov8GYOUZK+bOuZrJF0PlhXEgjYkb+u1WrlTiBw9lS7CW1jchW+GfnNSHFsDaaxYRiCBcUkwNhuPXamnNKo4VEQLJA06Aax9Ky8ilGMQjjf1G0uxjxfiqO3u0bMoZXnxiCPLY+lWPCccue5tqgGUIoI8fhPoYB8JrNntG3dIOwP+f0rQOW1zW4n8TESNYMHf51nKtUqfZSDtPZdMejjDo9p2GUh0lZ0btCSD0PnU9zxxIm+lofAiBiDEEvOvoAPmajuKYAG0xDHMFlSNwRrI7jpVW4nxTF3gcUQjZwpVVmVChRB0EmASfEmKML8HHrkxkitlL4sV4lYV0LgZXXVWiCCPHqIkVPcG4qSiO46KVjYHLB89SfnVVscYW/bdfhfKwy9fhBkeRzCpTlTHK+FCv8AhBB8RJE0ntFc+zC4y6GvtXxtu4mHKMc0ucv4Y7IJ8DMR4E1m4MEEbgyPSrlxHAPcwozKS6dtNNWQ/F56QfSqXXdilcThzQcZG18q8WTE2SQxVlADqCZBkZWHXQg/OnnFff2ULtcL6MqqAASDOrEeW9Z7yHiBadnZZV2RB6azHzq6cZxTXbyqoJSDpG+8HUiufPNRdI6cEW4psccs8GbKtx3EaErvPeJ2q/4jG2raZ3dUSNyQKp3Dr8IF26VAce5bxl5/fW7b3kJhQLiCANJh2GmnStelmqaSF6iLfLZP8Y9oqLKYZC52ztovmBufpVWbnjGyf3yjwhNKYcT5H4mXS2LUIxC5ldcgnqxBzAeMVBYjkfHqzL+zuYJEhlgwdxrXU7OTg+laDXoorRkKKKKAPK9oig0AZr7RLPurqOqSLgYHwdiBPhpB+dVK5woBAAMxJOpmG8B1jpPga1LnzDhsNmjtIysNPGNfDWqOyr7xEzDIF7Mka5cp+58/rXHlh5Hbin4ozi87IXt/CVJBFN+FYrI+vf8AepzncD9qaBsq5j3nfX0iqqZLSOlUUU4tfJiU5KSfwX7G4sMibEF0P1FSPEMODBHTWqfZvEogb8yfcVacTijkB7/0rgnDVJL8nowlbsq/HEAOY+A/SrRyldIsL3mDpvqf0NVXiaG46KDuYHy3+5q88MwgREC6ZRl1GhjX+greT/Gk+yT+9v2JRLhZST3dNiO+qXgbzLYZRsjMmvdmJHnpFXizbkQR/frPr96q+I4LdZme0yiWYZGWRodwdwYIrOOPsxOSXJX+KMEUsVCvupA+/wAzU7y/hSMKI0JX7zUXxfg93MAxRgo1ykxpsPp9KtXC8QiomoykAeA2+k1Sb8EjEfubG9jHIliyxkuSEVBqTrlZQBqevyrrAcqYR2ctZJcMWKsWBE6lcsjQGabYTDWVTGYi4huW0ZEtpmIGdj2ipUgwACY8Kk+EX0W8gDygszJJMzl3J3I2JPWqQWitPszLzu10c4nhdgOrWlCd0Ds6E/h23n61JnhCMDDstzfOGOWdI0OgGnSq/j+OxdQaZWcie4DaDG+lWm5xVAiuiu8qTCI5LQNgYgGdNanonK2PZqKRE4Z3SUcSw/ENj3H6Vp3CXLWUYrlJUSvdVQ4Vy7cxDpiMQoQQCEUtpBkZpA1161elUAQK6PT43Ft+xDPNSSS7BjSefwpRq4muo5jqia8AoNAj2vRXgooAAaKKDQAjibKupRhIIg1nfMfCkwmVmuKAxZELA6ncB4GkdD4DurR8tZz7UMQxa3agSVcjwJKiZ8gY9anlS1bLYm9kjIsRcLFizZjOpmZjT5QKZ4Ub0/4lgGtjr5RTDDIQdV6TNTi042i0rU0miVs25ZEOkuo8tRNWDHAgQdREjw18fSmSYeArAT2gfWRFTGLVckkzEKPmK45yto7K1IGxAxdpNYg+hKkSfIT9Kv8AgbQKdoaQ0geOm/kPpWe8QUK6OYhGGbf4WMMfkZq9YDFK1osDoTodxr/QfpWpRvVoi5U2mSti4JgnUTPTaJ9II+dR2LwpygSCxdhHfmjSOo0qRw1xTAIggD9N/wDNq44JaW5iMrEZUeRG4yg6noOkVtQtpEtuGytc3J+wPZzyTcRiQB2VgiAPQ6+VO/ZlhlxaXzcQhFbKpBiS0tpHVVjw7Qo9tGDVksXEbPkLq3aJIzAEfY1P+ylbK4BFtujOSz3Ap7QZjEMu4hQqz1iutYIJ9HN9aT9x3ieUStgYeyQyZ2dg/wATEiNwI0E/OoHivBEXFG5cs3FUoltAf/jhQAAWHZzeE761pTuVRmG4BiqTz3xz9lw1m3lDvfbVSTqqjMW0/iyfOsyxK3RtZXXJHjgNowCqkGNoJ0nqPCptcT7pVBUNEaANAjae+qTyRxi9iceiuQqQewohQAp9Z8a14YFJlQB6A/eniw6S2f6MzzOcaX7IXDcfd+qgeR+xp2eLGNXXy2qWWyvcPkK8OFTqq/IV03H4Iay+SuNx95+FY/3opP8A109yf/p/erMcIn5E/lFH7In5F/lFPaPwGsvkcTRmoJriambO5pJ8Sq7n6E/alDXJFAHBxaDqf5W/Skzj0/N9D+lLEUAU+BUNW4raG7AeYP6VX+a7SYhUZId0MRBnKd+nTerQ9sHcA+YrxUA2AHypNRaoatOzC+N8OY5tRmVSch0YA/ijePSorhdvO2V1CnQDSQREEafPep321oBjLLo0E2cpKnbK7d22j1noxdwbO46aMRXM8LSpM6F6mnyi9cWGRVCxIZc2ogFgxUeZyNA/hNeo+ZDm/wAJEDXzilOD8LV+BYly37xrhvAneLOUATuTpc1/iqlYPjVy2Cujj+LX1nesS9NSVG16q3yTlwB+wJjunvzHf/N6vPKXB7yWAl22x/LCmQsyCT1P9KjvY7aF+9iblxEbIqZRlEAuzkkT17FbFNWxY9eyWXKp9FDuIoOQrckdAh08/lUlw/gkqSCQGIJMGdBEawYq1ZqC1WqKdpEblVWU3mXlPPhrqh8zZSwBmSV1jfwrA7N17NzMjsjqdGUlWHqK+rtawP2qcufs2J96gi3elhGyt+Jf61pu0Yap8C/DvaxjUyi4tq8oABlSrmANcymJO8wd9qgecua3x95LrJ7tUQIqB8wGpLNMDUyOnQU0wCK9ll0zKSfE1F3LRVgD1E1mgb9jR/YxYzYq4/5LZ+bED7E1tgFZh7FsFltXrsfGyou+yiT/ANQrTQK1LscOjuiuaKybOqJrmK8jzoA6JrjOJ3+dBY7UTRQrPWY9KJNeA17TFYZjO1J3MUqkAkSdh1PkKQx9xwh92oZugJgVG4C1fgvdAznuA0HTY1pRsTk1wSz4nu+tVfivFS5KKeyNJHXx8qd8TtYhlyIjGd9VH1JqJTl7ENuqr4lh/Sa3GKRKUpPpFG9plibdi4NIZ1PecwBB/wCQ/Os9ir/7UcPctGxbcaHO0gnKSMo08s3d1qhW1zELtJAkzAkx0BPyFSn9xuPRr3Jti0eF5bx0a3f010Ba5roNdKx0V9EcP5P93YWw10tlTJIUAbakDXqTXz5iLeR2SScrMskFScpIkqdVOmx2ol7ArNg9h6D3GJIIzG4gI6gBDB8iWb5GtRC1lvsOxQNrE2ssFXRy3Uh1KhfT3ZP/ABVqQFBtBFezRFAWgYVWvaBwQYrBXFiXQe8TvldSB5ifPSrLFEUk6YmrVHyvwy9luLOxMH1p5xLDSAR0cp/MJH2NKc3cOXD4+/ZGiLcJEdFeHUDyVwPSpflnAe8xKWVGabls9rQaSWJEzoobrrVIJNtEpWjZeT+FjDYOza/EFDP/ALz9pvkTHpU4DXkUAVhu2VXHB7NezXle0hhRNFE0DPKFNeV4WpmT2aTJoDSaGWmBzSgFcR412tMDwmuswoKiuIoTAxr233ScRh1nsi0xA8WaD9FX5VSOVnK43DFSAff2gCQCO06g6HwJq5+2xT+1WG6GzA9HafuKqnJNgPj8KpMfvkb+U5gPmtYfYvc+lZr5f5lu58ZiWJmb90z4Z2j6RX0+FjWvlTGuWuOzAqWZiQdwSxJB8RRIGa/7D5/Z8SenvEjzCa/cVp6tWf8Asaw2XAM3+0vO3oAi/dDWgA00uBnoNezXleigYTQaBXlID5/9q9rLxK6fzLbb/kVf+2pj2dYQDiCD8qFx/IR/3g+lI+2i0P2xGG5soG/mfL9j8qb8h47LjMI5PxD3R+TIPuKpHv8Aj+iMv7N2oooBrBY9omvJomkB7RXk17NAHJNJmumaPCuC1bQgBrrNXBoFAHUUTXhauS1MBUNQ1Ih66DUqFZjvtub9/hv/AK3/AOoVXPZrhGucRw8GMjG4T4ICY9SQPWrf7YOEvcu4e4rCCjplJgDKQcw880egqvco8IfD43DPcdlDtlU2mGrCDkfMB2GEgxNSco7VfJv6ctdq4+Td797KrMSFCqWJOwgST9K+U710uxdjLMSzE7kkyT6k19L8w33/AGW/7skOLblY3EDX1is4w+QJoi5Qo0yiDA8tql6jN9JpVdlcOD6qbuqLT7ILubhyiD2blxdtDJzSPDtR6Grwag+ULbJgrCuxZ8iliehOseQmPSpoPXSuiIZq7DUmRXLGKdCF6CaQFyoXnTjb4TBXcRbClkCBc2qyzqskdYzTHhWaAyX2m8TTEY9whJVEWy2kQ6M5I18TE+NQ/LuIyNaf/ZX0Y+UqfupqO45cJxF15PbYvJjMc/akwAJ7XQV0R7tmLKYOw2IYEdxjf71qL5Jy5PqGiaoHInOaXVTD3SiMLdtbZZ9bhEqRqAMwhdJJMmryblKjadoWFe0kGFBcb0UMVmiaSL1x60tQPGujuozU2DTXQNU1MbC4evM9Jiulaih2dSa8Kmug9GagBNkNeCaULU3u3I/ShcidIzfni+n7WwViTktq6g/C8MV3MarG2ug76OXsCbt+yG0Fti6tMnNExp/CG+YNPeY+Gr+0Z0aHdUNwD+HNlI7pzfJV76f8EQo6Ek/FA/4t9eu9eXlklnX/AFHp47eCixcRuhbN1mj4H38jA+tZwbQKOBn1UjLoBr8QAOmvoKvvHMJ7209sM3bBXSJE+dULDA2yVuo4yzpkfWJ11Gu3Sr+thJ6yjyR9HKK2UjVcEylFZdmVSJnYgdKVYioDlnFZ7OiuFBMZlZTGnRtamMh8a6YW4Jvg5pqpNIVL+dGfwmuVWvFUdKoYAvVd9oFlr3DsQi/FlDQe62ys3rlUx41YWUd9R/FcCLiOhJh1ZTHcwg/emknwJtro+duIubhFzKFzKo307Iyz4fD1qX5uEm3cQHJeRX8nVVS6nmGQN5MD1pbmPlnEWLhRbVx7U9llBbfecuxnvplj3vqiLeR0WbmQMrAHsgMROm+XYdBWGqbQXwccsXbK4m2cSuewSysOgDBlzR/CWzdNp6V9A8uMThbMszdhe0xlmEdksepKxrXzQykbVtXs75uR7NnDOWFxQUVmiGC7LPVgv2pRQ7rsv2XwoEDQVz7yuWetUwtCjeVc5qSzUZqeobDZbldG5SC7UoNqoyaOmxFKh/CkU3NCbGkxoXFyvc9JGg9KSQztrlNrpY7UsK8u7U0ZZTeK8FvO7v70IGYMInMIAGXoCDH9654Nwe+GXPclQQZ3Yx9vnVixe4pTA1OWGDd0WjlmlVkmj+ld5AdSJ86TXalegpsydCBtFe5jSa9a7G3zoNAXiuTNJJ186WX+tAmJEHwoymlBvXg/WtGRJlNVDnHlM4sIc8FMxAPXMBpM6aga61eenrRc+A+tFiaPn/GcnYpGyqgb/e93/wBTHWp/lnk/ECGYojBkYSQQpVlb4VEEkDvWPGtPxHwL5U3w36fcUaJMTZJI/wDn/iuTcFcnYef9a9bc0IDwt1rzOe8UNXlaoD//2Q==', 
				description: 'Dress up your Fit with a Fur Coat'
			}, 
			{
				item:'PULP FICTION',
				img: 'https://i.pinimg.com/originals/d1/b6/36/d1b6361ff25399c28dbad129780eac6a.jpg', 
				description: 'Dressing up your Casual Wear'
			}, 
			{
				item:'S P L A S H',
				img: 'https://cdn.shopify.com/s/files/1/0565/4298/6428/products/H2ba0c94ee29e420b8f85006197560cf1o.jpg?v=1623804127', 
				description: 'Pair your Fit with a Fashionable Trench'
			},
			{
				item:'JUST DO IT',
				img: 'https://i.pinimg.com/564x/57/19/8c/57198c4e891be8bb63e4995609f18eab.jpg', 
				description: 'Pair your Favorite Hoodie and with your Favorite Kicks'
			},
			{
				item:'C H A N N E L  O R A N G E',
				img: 'https://i.pinimg.com/564x/f1/8b/53/f18b531c9936c14d94b119ec5f15a01e.jpg', 
				description: 'Plaid Pants Meet Trenchcoat'
			}
			

		]

		try {
			await Fashions.deleteMany({})
			const fashionItems = await Fashions.create(fashionItem)
			res.redirect('/fashions')
		} catch (err) {
			res.send(err.meessage)
		}
	})	

//index route

router.get('/', (req, res) => {
	try{
		Fashions.find({}, (err, allFashions) => {
			err ? res.send(err)
			: res.render('index.ejs', {
			fashions: allFashions
		})
		})

	}
	catch (err) {
		res.send(err.meessage)
	}
})

// new route

router.get('/new', (req, res) => {

	res.render('new.ejs')

})

//show route 

router.get('/:id', (req, res) => {
	try{
			Fashions.findById(req.params.id, (err, foundFashions) => {
				err ? res.send(err)
				: res.render('show.ejs', {
					fashions: foundFashions
				})
			})
	}
	catch (err) {
		res.send(err)
	}
})

//edit route

router.get('/:id/edit', (req, res) => {
	try{
		Fashions.findById(req.params.id, (err, foundFashions) => {
				err ? res.send(err)
				: res.render('edit.ejs', {
					fashions: foundFashions
				})
			})
	}
	catch (err) {
		res.send(err)
	}
	
})

//update route

router.put('/:id', (req, res) => {
	try{
		Fashions.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedFashions) => {
			err ? res.send(err)
			: res.redirect('/fashions/'+req.params.id)
		})
	}
	catch(err) {
		res.send(err)
	}
})

//post route 

router.post('/', (req, res) => {
	try{
		Fashions.create(req.body, (err, createdFashions) => {
			err ? res.send(err)
			: res.redirect('/fashions')
		})
	}
	catch(err) {
		res.send(err.meessage)
	}
})

//delete route 

router.delete('/:id', (req, res) => {
	Fashions.findByIdAndDelete(req.params.id, (error, deletedFruit) =>{
		if (error) {
			res.send(error)
		} else {
			res.redirect('/fashions')
		}
	})
})



module.exports = router