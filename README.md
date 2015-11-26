AutoPoste
=========

Automatically fills the form for collissimo shipments, from a given formated text.


** will only work as is for this form, and this text format ** 

but could be usefull as a resource for other applications ?
_________________________________________________________


Bon, je vois que c'est plus galère qu'autre chose si de ton côté tu dois t'y intéresser. Comme tes informations j'en ai finalement besoin que pour faire les choses "proprement", autant que ça soit pas bloquant, et que je te passe une version directement utilisable. Si elle sert et que tu veux plus, tu me diras. Sinon, elle devrait résoudre simplement, en l'état, le problème de mettre tes infos telles que tu les exportes, dans le formulaire.

Un récap :

 - parse ton format de données actuelles et pas du json
 - peut s'ouvrir à l'aide de CTRL+espace.
 - contrôle la longueur des données
 - "devine" le sexe (buggé dans la version précédente)
 - défile la page jusqu'aux infos du destinataire
 - ne selectionne pas la ville
 - ne sait pas s'il doit cocher ou non les checkbox du bas (2 lignes à décommenter dans le fichier content.js)
 - est chargé pour toutes les pages visitées par chrom(ium) (cette histoire de regexp où il me faut l'URL de la vraie page)
