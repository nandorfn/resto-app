const emptyPage = () => `
<div>
  <picture>
    <source media="(max-width: 600px)" srcset="./images/empty-small.jpg">
    <img id="emptyPage" class="h-fluid w-fluid" src='./images/empty-large.jpg' height="100" width="100" alt="empty" />
  </picture>
<h4 class="text-center w-full mt-5 resto_not_found">Your favorite list is empty</h4>
</div>
`;

const error404 = () => `
<div class="mt-5">
  <picture>
    <source media="(max-width: 600px)" srcset="./images/404-small.jpg">
    <img id="error404" class="h-fluid w-fluid" src='./images/404-large.jpg' height="100" width="100" alt="empty" />
  </picture>
<h4 class="text-center w-full mt-5">Cannot get data!</h4>
</div>
`;

export { emptyPage, error404 };
