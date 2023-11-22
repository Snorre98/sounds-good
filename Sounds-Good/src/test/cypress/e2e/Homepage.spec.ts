describe('Test the different components in the Homepage', () => {
  //Checks if the application can be started and refreshes the page before all tests.
  beforeEach(() => {
    cy.visit('/')
  })

  it('Test navbar', () => {
    //Checks if the navbar exists and contains the logo.
    cy.get('[data-cy=Navbar] > :nth-child(1)')
      .should('exist')
      .should('contain', 'Sounds Good')

    //Checks if the navbar contains the Homebutton.
    cy.get('[data-cy=Navbar] > :nth-child(2)')
      .should('exist')
      .should('contain', 'Home')
  })

  //Checks if the radio buttons exist and can be clicked.
  it('Test radiobuttons', () => {
    cy.get('[data-cy=ArtistButton]').should('exist').click()
    cy.get('[data-cy=AlbumButton]').should('exist').click()
    cy.get('[data-cy=TrackButton]').should('exist').click()
  })

  //Checks if the searchbar exists and can be used.
  //The result from the search will be empty, however
  //the container for the result still exists and can be
  //used in the test.
  it('Test search', () => {
    cy.get('[data-cy=Searchbar]')
      .should('exist')
      .type('test')
      .should('have.value', 'test')

    cy.get('[data-cy=SongsContainer]').should('exist')
  })

  //Checks if the slider exists and can be used.
  it('Test slider', () => {
    cy.get('[data-cy=SliderContainer]').should('exist')
    cy.get('[data-cy=Slider]').should('exist').click(100, 0)
    cy.get('[data-cy=Slider]').click('right').click(250, 0)
  })

  //Checks if the dropdown exists and that the options can be selected.
  it('Test sorting dropdown', () => {
    cy.get('[data-cy=Select]').should('exist')
    cy.get('[data-cy=Select]')
      .should('exist')
      .select('Default')
      .should('have.value', 'Default')
    cy.get('[data-cy=Select]')
      .should('exist')
      .select('Alphabetically(a-z)')
      .should('have.value', 'ASC')
    cy.get('[data-cy=Select]')
      .should('exist')
      .select('Alphabetically(z-a)')
      .should('have.value', 'DESC')
  })

  //Tests if the radiobuttons have the desired effect on the search.
  it('Test the song search functionality', () => {
    //Start off by typing in "test". The default value of the radiobuttons is "Track".
    //The search should therefore return 3 results.
    cy.get('[data-cy=Searchbar]').type('test')
    cy.get('[data-cy=SongsContainer]').children().should('have.length', 3)
    //Check the radiobutton "Artist". The search should now return 0 results,
    //since there are no artists in our dataset that contains the word "test".
    cy.get('[data-cy=ArtistButton]').click()
    cy.get('[data-cy=ArtistsContainer]').should('exist')
    cy.get('[data-cy=ArtistsContainer]').children().should('have.length', 0)
    //Check the radiobutton "Album". The search should now return 1 result,
    //since there is one album in our dataset that contains the word "test".
    cy.get('[data-cy=AlbumButton]').click()
    cy.get('[data-cy=AlbumsContainer]').should('exist')
    cy.get('[data-cy=AlbumsContainer]').children().should('have.length', 1)
  })

  it('Test pagination', () => {
    //Switch to albums and type "G".
    cy.get('[data-cy=AlbumButton]').click()
    cy.get('[data-cy=Searchbar]').type('G')
    //Check that a div with the id "DivForTest" exists and that it contains 5 children.
    //This div is only needed for testing purposes and is not used in the application.
    cy.get('[data-cy=DivForTest]').should('exist')
    cy.get('[data-cy=DivForTest]').children().should('have.length', 5)
    //Then click the "Show more" button and check that the div now contains 10 children.
    cy.get('[data-cy=ShowMoreButton]').should('exist').click()
    cy.get('[data-cy=DivForTest]').children().should('have.length', 10)
  })

  it('Test the track duration filter (Slider)', () => {
    //Start off by typing in "test" and checking that the three results are returned.
    cy.get('[data-cy=Searchbar]').type('test')
    cy.get('[data-cy=SongsContainer]').children().should('have.length', 3)
    //Change the minimum value of the slider to 201 seconds. The search should now return 1 result,
    cy.get('[data-cy=Slider]').should('exist').click(100, 0)
    cy.get('[data-cy=SongsContainer]').children().should('have.length', 1)
    //Check that it is the correct song that is returned. The other two song are under 200 seconds long
    cy.get('[data-cy=SongsContainer] > :nth-child(1)').should(
      'contain',
      'Science & Blood Tests'
    )
  })

  it('Test the sorting functionality', () => {
    //Starts off by typing in "test".
    cy.get('[data-cy=Searchbar]').type('test')
    //Check that the first song is "TEST DRIVE", since this is the correct
    //behaviour for default sorting.
    cy.get('[data-cy=SongsContainer] > :nth-child(1)').should(
      'contain',
      'TEST DRIVE'
    )
    //Change the sorting to alphabetical and check that the first song
    //is "Science & Blood Tests", since "S" comes before "T".
    cy.get('[data-cy=Select]').select('Alphabetically(a-z)')
    cy.get('[data-cy=SongsContainer] > :nth-child(1)').should(
      'contain',
      'Science & Blood Tests'
    )
    //Change the sorting to reverse alphabetical and check that the first song
    //is "Testify", since "T" comes after "S".
    cy.get('[data-cy=Select]').select('Alphabetically(z-a)')
    cy.get('[data-cy=SongsContainer] > :nth-child(1)').should(
      'contain',
      'Testify'
    )
  })

  it('Test the tag filter for albums', () => {
    //Start of by navigating to album search and typing "G"
    cy.get('[data-cy=AlbumButton]').click()
    cy.get('[data-cy=Searchbar]').type('G')
    //Check that a div with the id "DivForTest" exists and that it contains 5 children.
    //The length of the result is only 5 because it is not paginated.
    cy.get('[data-cy=DivForTest]').should('exist')
    cy.get('[data-cy=DivForTest]').children().should('have.length', 5)
    //Clicks on the filter and finds the the tag "kanye west" and clicks on it.
    cy.get('[data-cy=Autocomplete]').click()
    cy.contains('kanye west').click()
    //Check that the tag has an effect on the search result, returning the only album with the tag "kanye west".
    cy.get('[data-cy=AlbumsContainer]').children().should('have.length', 1)
    cy.get('[data-cy=AlbumsContainer] > :nth-child(1)').should(
      'contain',
      'Graduation'
    )
    //Add another the tag "2014" and checks that the search result is effected. This adds another album to the result.
    //This is to demonstrate the nature of the tag-filter, showing that it returns all albums that contains any of the tags.
    cy.get('[data-cy=Autocomplete]').click()
    cy.contains('2014').click()
    cy.get('[data-cy=AlbumsContainer]').should('contain', 'Stay Gold')
  })


  it('Test the Artist page', () => {
    cy.get('[data-cy=ArtistButton]').click()
    cy.get('[data-cy=Searchbar]').type('Kanye West')
    cy.get('[data-cy=ArtistsContainer] > :nth-child(1)').click()
  })
})

// '[data-cy=]'
