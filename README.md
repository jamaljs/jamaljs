<div align="center">
<h1>JML.JS</h1>

<p>JML(JavaScript Mark-up Language) JS view framework built on top of everything</p>

</div>

Usage: 
```html
<div id="root"></div>
<script type="text/javascript" src="jml.min.js"></script>
<script>

    const selector = '#root';
    const jmlInstance = new jml(selector, div(
        { class: 'container' },
        function () {
            const userId = 1;
            const users = [
                {id: 1, name: 'Akın', lastname: 'Özgen'},
                {id: 2, name: 'Nameless', lastname: 'Foe'},
                {id: 3, name: 'Unnamed', lastname: 'Budy'},
            ];

            const currentUser = users.find(x => x.id === userId);

            return p({}, `Welcome Back, ${currentUser.name} ${currentUser.lastname}`);
        }
    ));
</script>
```

this is it