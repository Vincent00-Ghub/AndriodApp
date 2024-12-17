import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BooksGrid.css";

const BooksGrid = () => {
  const navigate = useNavigate();
  const [showPdf, setShowPdf] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book

  // Books array with multiple PDFs for some books
  const books = [
    { title: "Textbooks", route: "/textbooks", icon: "📚",  pdfLinks: [
        "https://sccmath.files.wordpress.com/2017/07/college-mathematics-textbook-1st-edition.pdf",
        "https://antinifizicari.wordpress.com/wp-content/uploads/2019/08/basic-mathematics-for-college-students-pdfdrive.com-.pdf"
      ]
    },
    { title: "Reference Books", route: "/reference-books", icon: "🔖", pdfLinks: [
        "https://wac.colostate.edu/docs/books/bazerman_shaping/references.pdf",
        "https://library.uplb.edu.ph/wp-content/uploads/2019/09/na-2011-2.pdf"
      ]
    },
    { title: "Fiction & Literature", route: "/fiction-literature", icon: "📖", pdfLinks: [
        "https://www.oasisacademyjohanna.org/uploaded/Johanna/Curriculum/Role_of_Parents/Top_100_Fiction_Books.pdf",
        "https://www.opentextbooks.org.hk/system/files/export/14/14914/pdf/Literature_the_Humanities_and_Humanity_14914.pdf"
      ]
    },
    { title: "Academic Journals", route: "/academic-journals", icon: "📑", pdfLinks: [
        "https://educ.upd.edu.ph/wp-content/uploads/2024/04/PJES-DOI-04162024.pdf",
        "https://files.eric.ed.gov/fulltext/ED610428.pdf"
      ]
    },
    { title: "Study Guides", route: "/study-guides", icon: "📝", pdfLinks: [
        "https://berlutbooks.com/wp-content/uploads/2019/02/eng_preview_v3.pdf",
        "https://www.wlv.ac.uk/lib/media/departments/lis/skills/study-guides/LS039-Guide-to-Useful-Study-Skills-Books.pdf"
      ]
    },
    { title: "Personal Development", route: "/personal-development", icon: "🌱", pdfLinks: [
        "https://buenavistanhs.weebly.com/uploads/7/2/2/8/7228051/personal_development_reader_v13_final_apr_28_2016.pdf",
        "https://www.skillsyouneed.com/docs/personal-development-preview.pdf"
      ]
    },
    { title: "Science & Technology", route: "/science-technology", icon: "🔬", pdfLinks: [
        "https://www.telanganaopenschool.org/images/ssc_pdfs/TOSS%20%20Science%20and%20Technology%20EM_2021.pdf",
        "https://moecdc.gov.np/storage/gallery/1687157819.pdf"
      ]
    },
    { title: "Social Sciences & Humanities", route: "/social-humanities", icon: "📜", pdfLinks: [
        "https://www.moteoo.org/sites/moteoo.org/files/Resource%20English/social_science_and_the_humanities_english_student_book_for_web.pdf",
        "https://bookchapter.org/kitaplar/Critical%20Studies%20in%20Social%20Sciences%20and_Humanities.pdf"
      ]
    },
    { title: "Business & Economics", route: "/business-economics", icon: "💼", pdfLinks: [
        "https://hoclv.com/wp-content/uploads/2018/05/Alan_Griffiths_Economics_for_Business__ManagemeBookFi.org_.pdf",
        "http://ndl.ethernet.edu.et/bitstream/123456789/42009/1/10.pdf"
      ]
    },
    { title: "Nonfiction & Biographies", route: "/nonfiction-biography", icon: "📕", pdfLinks: [
        "https://ati.dae.gov.in/ati12052021_9.pdf",
        "https://www.sjsu.edu/faculty/mary.warner/Engl112B_handouts/LfTYA_Chapter_9.pdf"
      ]
    },
    { title: "Technical & Coding Books", route: "/technical-coding", icon: "📗", pdfLinks: [
        "https://cse.buffalo.edu/faculty/atri/courses/coding-theory/book/web-coding-book.pdf",
        "https://www.ime.usp.br/~alvaroma/ucsp/proglang/book.pdf"
      ] 
    },           
    { title: "Psychology & Cognitive Science", route: "/psychology-cognitive", icon: "📙", pdfLinks: [
        "https://www.canyons.edu/_resources/documents/academics/onlineeducation/Psych126TextbookFinalV1_2.pdf",
        "https://www.aupress.ca/app/uploads/120227_99Z_Dawson_2013-Mind_Body_World.pdf"
      ]  
    },          
    { title: "Philosophy & Ethics", route: "/philosophy-ethics", icon: "📓", pdfLinks: [
        "https://openlibrary-repo.ecampusontario.ca/jspui/bitstream/123456789/732/4/Introduction-to-Philosophy-Ethics-1596308258._print.pdf",
        "https://etica.uazuay.edu.ec/sites/etica.uazuay.edu.ec/files/public/Philosophy%20101_%20From%20Plato%20and%20Socrates%20to%20Ethics%20and%20Metaphysics%2C%20an%20Essential%20Primer%20on%20the%20History%20of%20Thought%20%28%20PDFDrive%20%29.pdf"
      ]
    },    
    { title: "Arts & Design", route: "/arts-design", icon: "🎨", pdfLinks: [
        "https://dpi.wi.gov/sites/default/files/imce/cal/pdf/planning-curriculum-in-art-and-design.pdf",
        "https://www.dbraulibrary.org.in/RareBooks/the%20art%20of%20color%20and%20design.pdf"
      ]    
    },
  ];

  // Function to handle book click
  const handleBookClick = (book) => {
    if (book.pdfLinks && book.pdfLinks.length > 0) {
      setSelectedBook(book); // Set the selected book
      setIsModalOpen(true);   // Open the PDF selection modal
    } else {
      navigate(book.route); // Navigate to the route if the book doesn't have PDFs
    }
  };

  // Function to handle PDF selection
  const handlePdfSelection = (pdfLink) => {
    setShowPdf(true);
    setPdfLink(pdfLink); // Set the selected PDF link to display
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="books-grid-container">
      <h1 className="books-title">Books</h1>
      <div className="books-grid">
        {books.map((book, index) => (
          <div
            key={index}
            className="book-item"
            role="button"
            tabIndex="0"
            onClick={() => handleBookClick(book)}
            onKeyDown={(e) => e.key === "Enter" && handleBookClick(book)}
          >
            <div className="book-icon">{book.icon}</div>
            <p className="book-title">{book.title}</p>
          </div>
        ))}
      </div>

      {/* Display the PDF selection modal if the user clicks on a book with PDF links */}
      {isModalOpen && selectedBook && selectedBook.pdfLinks && selectedBook.pdfLinks.length > 0 && (
        <div className="pdf-selection-modal">
          <h2>Select a PDF for {selectedBook.title}</h2>
          {/* Loop through the PDF links and display them */}
          <ul>
            {selectedBook.pdfLinks.map((pdf, index) => (
              <li key={index} onClick={() => handlePdfSelection(pdf)}>
                {selectedBook.title} PDF {index + 1}
              </li>
            ))}
          </ul>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}

      {/* Display PDF inside iframe */}
      {showPdf && pdfLink && (
        <div className="pdf-container">
          <iframe
            src={pdfLink}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            title="Book PDF"
          ></iframe>
        </div>
      )}

      {/* Return to UDMWelcome Button */}
      <button
        className="return-button"
        onClick={() => navigate("/dashboard")} // Navigates to UDMWelcome
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default BooksGrid;
