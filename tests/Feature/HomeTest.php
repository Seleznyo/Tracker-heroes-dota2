<?php

test('home redirects to the heroes page', function () {
    $this->get(route('home'))->assertRedirect(route('heroes.index'));
});

test('heroes page can be rendered', function () {
    $this->get(route('heroes.index'))->assertOk();
});
