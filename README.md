# Sem6-Hybride-Wereld



## Git

**NIET OP MASTER WERKEN**

Als je ergens aan werkt haal je eerst de master op:
```
git pull origin master
```

Hierna maak je een branch en maak je hem zichtbaar voor de rest:
```
git checkout -b <branchname>
git push --set-upstream origin <branchname>
```

Hierna werk je op deze branch. als je bestanden hebt push je ze naar deze branch door eerst de bestanden toe te voegen.
```
git add .
```

Hierna commit je met een message dat verteld wat je hebt veranderd (file aangepast, file toegevoegd etc):
```
git commit -m "<message>"
```

