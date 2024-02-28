import React, { Fragment } from "react";
import Header from "../../components/Landing/Header/Header";
import Footer from "../../components/Landing/Footer/Footer";
import { Alert } from "@mui/material";
import { Typography } from "@material-ui/core";

const LandingPage = () => {
    return (
        <Fragment>
            <Header />
            <div
                className="mt-2 mr-3 ml-3 p-5 d-flex justify-content-between align-items-center "
                style={{ backgroundColor: '#edf0f2', height: 200, borderRadius: '2rem' }}
            >
                <div className="w-100">
                    <Typography className="text-center" style={{ color: 'black', fontFamily: 'revert' }} variant="h4">
                        <strong>ĐIỀU KHOẢN SỬ DỤNG</strong>
                    </Typography>
                </div>
            </div>
            <div className="container mt-3">
                <p>
                    Các Điều khoản sử dụng này có hiệu lực kể từ ngày 10 tháng 12 năm 2023.
                </p>
                <p>
                    Chào mừng đến với Onlearn! Các điều khoản sử dụng này áp dụng cho việc bạn (“bạn” hoặc “của bạn”)
                    sử dụng nền tảng dịch vụ trực quan của Onlearn. Bằng cách sử dụng dịch vụ, bạn đồng ý rằng các điều khoản
                    này sẽ trở thành thỏa thuận ràng buộc về mặt pháp lý giữa bạn và hợp đồng Onlearn được xác định trong các Điều khoản này (“Onlearn”).
                </p>
                <h5>
                    1. Tổng quan
                </h5>
                <p>
                    Onlearn là một nền tảng truyền thông trực quan cho phép mọi người học và chia sẽ các khóa học của đến với mọi người.
                    Khi sử dụng dịch vụ, bạn sẽ có quyền truy cập vào nhiều nội dung do Onlearn và các nhà cung cấp nội dung khác cung
                    cấp (“Nội dung được cấp phép”). Việc bạn sử dụng nội dung được cấp phép phải tuân theo thỏa thuận cấp phép nội dung.
                    Bạn cũng có tùy chọn tải lên nội dung của riêng mình (“Nội dung người dùng”), chẳng hạn như nội dung bài học, video,
                    hình ảnh và tệp mà bạn có toàn quyền kiểm soát và chịu trách nhiệm. Bạn có thể sử dụng nội dung được cấp phép, nội dung
                    người dùng và các dịch vụ có sẵn trong Onlearn để tham gia khóa học và tạo khóa học của mình.
                </p>
                <p>
                    Dịch vụ được cung cấp trên trang chủ Onlearn, và dưới các hình thức khác do Onlearn cung cấp hoặc cung cấp.
                    Việc bạn sử dụng dịch vụ phải tuân theo các điều khoản này và chính sách sử dụng được chấp nhận của Onlearn.
                    Bằng cách sử dụng dịch vụ, bạn xác nhận và đồng ý với chính sách quyền riêng tư của Onlearn.
                </p>
                <p>
                    Nếu bạn đang sử dụng Onlearn cho việc dạy học, vui lòng tham khảo điều khoản bổ sung của Onlearn for Education bổ sung cho các điều khoản này.
                </p>
                <p>
                    Bạn chỉ có thể sử dụng dịch vụ nếu bạn có thể hình thành hợp đồng ràng buộc với Onlearn và được pháp luật cho phép làm như vậy.
                    Bằng cách sử dụng dịch vụ, bạn tuyên bố và đảm bảo rằng bạn có toàn quyền, quyền hạn và thẩm quyền để đồng ý và bị ràng buộc
                    bởi các điều khoản này cũng như thực hiện đầy đủ tất cả các nghĩa vụ của bạn dưới đây.
                </p>
                <p>
                    Nếu bạn đăng ký dịch vụ bằng địa chỉ email do chủ lao động của bạn hoặc tổ chức khác cung cấp,
                    (i) bạn tuyên bố và đảm bảo rằng bạn là đại diện được ủy quyền của tổ chức đó có thẩm quyền ràng buộc tổ chức đó với các điều khoản này;
                    (ii) việc bạn sử dụng dịch vụ sẽ ràng buộc tổ chức đó với các điều khoản này; và
                    (iii) “bạn” và “của bạn” trong các điều khoản này sẽ đề cập đến cả bạn và tổ chức đó.
                </p>

                <h5>
                    2. Sử dụng dịch vụ
                </h5>
                <ol type="a">
                    <li>
                        <h6>Yêu cầu về độ tuổi.</h6>
                        <p>
                            Trẻ em không được truy cập hoặc sử dụng Dịch vụ trừ khi việc sử dụng của chúng được ủy quyền trực tiếp bởi cha mẹ,
                            người giám hộ hoặc người lớn được ủy quyền khác (chẳng hạn như giáo viên), những người đồng ý bị ràng buộc bởi các Điều khoản này.
                            Vì mục đích của các Điều khoản này, trẻ em là người dưới 13 tuổi (hoặc độ tuổi hợp pháp tối thiểu cần thiết để đưa ra sự đồng ý cho
                            việc xử lý dữ liệu cá nhân ở quốc gia nơi trẻ sinh sống). Đối với trẻ em sử dụng Onlearn for Education, vui lòng tham khảo Điều khoản
                            bổ sung của Onlearn for Education.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Có những hạn chế về mặt pháp lý trong việc cung cấp một số dịch vụ nhất định cho trẻ em.
                            Chúng tôi tuân thủ tất cả các luật áp dụng cho trẻ em sử dụng dịch vụ trực tuyến.
                            Bạn có thể tìm hiểu thêm về Onlearn for Education.
                        </Alert>
                    </li>
                    <li>
                        <h6>Truy cập vào dịch vụ.</h6>
                        <p>
                            Tùy thuộc vào việc bạn tuân thủ các điều khoản này, bạn có thể truy cập và sử dụng dịch vụ cho mục đích kinh doanh hoặc cá nhân.
                            Onlearn bảo lưu mọi quyền không được cấp rõ ràng theo các điều khoản này.
                            Mỗi người phải có một tài khoản duy nhất và bạn chịu trách nhiệm về mọi hoạt động được thực hiện trên tài khoản của mình.
                            Bạn không được cho phép bất kỳ bên nào khác truy cập hoặc sử dụng dịch vụ bằng tên người dùng, mật khẩu hoặc mã bảo mật khác của bạn.
                        </p>
                    </li>
                    <li>
                        <h6>Chống phân biệt đối xử.</h6>
                        <p>
                            Onlearn không hỗ trợ và sẽ không dung thứ cho việc dịch vụ của mình bị sử dụng để phân biệt đối xử với người khác, đặc biệt khi dựa trên chủng tộc,
                            tôn giáo, giới tính, khuynh hướng tình dục, tuổi tác, khuyết tật, tổ tiên hoặc nguồn gốc quốc gia. Bạn không được phép sử dụng dịch vụ theo cách
                            sẽ hoặc có khả năng kích động, thúc đẩy hoặc hỗ trợ sự phân biệt đối xử đó và bạn không được sử dụng dịch vụ để kích động hoặc thúc đẩy sự thù địch
                            hoặc bạo lực.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Chúng tôi tin vào việc trở thành một tập thể vì điều tốt đẹp trên thế giới và điều đó có nghĩa là chúng tôi không chấp nhận việc
                            Onlearn bị sử dụng theo những cách không phù hợp.
                        </Alert>
                    </li>
                    <li>
                        <h6>Hạn chế về việc sử dụng dịch vụ.</h6>
                        <p>
                            Bạn không được tự mình hoặc thông qua bất kỳ bên thứ ba nào (i) thuê, cho thuê, bán, phân phối, cung cấp cho văn phòng dịch vụ, cấp phép lại hoặc cung
                            cấp dịch vụ hoặc nội dung được cấp phép cho bất kỳ bên thứ ba nào (trừ khi được cho phép theo các Điều khoản này) ; (ii) sao chép, sao chép, dịch ngược,
                            đảo ngược kỹ thuật, cố gắng lấy mã nguồn, sửa đổi hoặc tạo các sản phẩm của dịch vụ hoặc bất kỳ phần nào của dịch vụ; (iii) truy cập dịch vụ
                            nhằm mục đích đánh giá hiệu suất; (iv) truy cập dịch vụ nhằm mục đích xây dựng hoặc tiếp thị một sản phẩm cạnh tranh; (v) sử dụng dịch vụ để lưu trữ
                            hoặc truyền vi-rút hoặc mã độc; (vi) sử dụng mạng riêng ảo (VPN) để tránh việc truy cập nội dung hoặc định giá dựa trên địa lý; (vii) sử dụng dịch
                            vụ để truyền các email không mong muốn hoặc tham gia gửi thư rác; (viii) sử dụng bất kỳ hình thức khai thác, trích xuất hoặc thu thập dữ liệu nào
                            trên dịch vụ và/hoặc nội dung có sẵn trong đó cho mục đích học máy hoặc các mục đích khác; hoặc (ix) bỏ qua các biện pháp chúng tôi có thể sử dụng
                            để ngăn chặn hoặc hạn chế quyền truy cập vào Dịch vụ, bao gồm nhưng không giới hạn ở các tính năng ngăn chặn hoặc hạn chế sử dụng hoặc sao chép bất
                            kỳ nội dung nào hoặc thực thi các hạn chế đối với việc sử dụng dịch vụ hoặc nội dung được cấp phép.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Chúng tôi nỗ lực làm việc để cung cấp Onlearn cho mọi người, vì vậy chúng tôi không thể cho phép bạn gây tổn hại cho Onlearn hoặc nền tảng.
                        </Alert>
                    </li>
                </ol>
                <h5>
                    3.  Bảo mật và quyền riêng tư dữ liệu
                </h5>
                <ol type="a">
                    <li>
                        <h6>Bảo mật thông tin.</h6>
                        <p>
                            Onlearn thực hiện và duy trì các biện pháp bảo mật vật lý, kỹ thuật và hành chính được thiết kế để bảo vệ thông tin của bạn khỏi bị truy cập,
                            phá hủy, sử dụng, sửa đổi hoặc tiết lộ trái phép. Bạn có thể tìm hiểu thêm về cách Onlearn bảo vệ dịch vụ và thông tin của bạn tại trung tâm thông tin của Onlearn.
                        </p>
                    </li>
                    <li>
                        <h6>Quyền riêng tư dữ liệu.</h6>
                        <p>
                            Chính sách quyền riêng tư của Onlearn mô tả cách Onlearn thu thập, sử dụng, chuyển giao, tiết lộ và lưu trữ dữ liệu cá nhân của bạn.
                            Bằng cách tạo tài khoản, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý đầy đủ với phụ lục xử lý dữ liệu của chúng tôi và
                            phụ lục xử lý dữ liệu sẽ được tích hợp vào các điều khoản này trong phạm vi dữ liệu cá nhân tuân theo luật dữ liệu hiện hành (như được xác
                            định trong phụ lục xử lý dữ liệu) được Onlearn thay mặt bạn xử lý liên quan đến việc bạn sử dụng dịch vụ. Trong trường hợp có bất kỳ xung đột
                            nào giữa các điều khoản này và phụ lục xử lý dữ liệu thì phụ lục xử lý dữ liệu sẽ được ưu tiên áp dụng.
                        </p>
                    </li>
                </ol>
                <h5>
                    4. Nội dung và khóa học
                </h5>
                <ol type="a">
                    <li>
                        <h6>
                            Nội dung người dùng.
                        </h6>
                        <p>
                            Bạn tuyên bố và bảo đảm rằng bạn sở hữu tất cả các quyền, quyền sở hữu và lợi ích đối với nội dung người dùng của mình hoặc bạn đã bảo đảm tất cả các
                            quyền cần thiết đối với nội dung người dùng của mình nếu cần thiết để cho phép truy cập, sử dụng và phân phối nội dung đó theo dự tính của những điều này.
                            Điều kiện. Giữa bạn và Onlearn, bạn sở hữu mọi quyền, quyền sở hữu và lợi ích đối với nội dung người dùng của mình. Bạn cấp cho Onlearn giấy phép miễn phí
                            bản quyền và có thể được cấp phép lại để hiển thị, lưu trữ, sao chép, lưu trữ và chỉ sử dụng nội dung người dùng của bạn trong phạm vi cần thiết để cung
                            cấp dịch vụ cho bạn. Trong phạm vi bạn đưa nội dung người dùng vào khóa học mà bạn đã chia sẻ với người khác, bạn cấp cho Onlearn giấy phép vĩnh viễn,
                            miễn phí bản quyền, có thể cấp phép lại để hiển thị, lưu trữ, sao chép, lưu trữ và sử dụng nội dung người dùng của bạn trong phạm vi cần thiết để
                            tiếp tục để cung cấp khóa học đó.
                        </p>
                        <p>
                            Bạn đồng ý rằng nếu bạn chọn tham gia thông qua cài đặt quyền riêng tư trong cài đặt tài khoản của mình, Onlearn, các chi nhánh và nhà cung cấp dịch vụ bên
                            thứ ba kích hoạt chức năng trong Dịch vụ có thể sử dụng nội dung người dùng của bạn để phát triển, cải thiện và cung cấp AI sản phẩm và dịch vụ, bao gồm
                            cả việc sử dụng công nghệ học máy. Chúng tôi sẽ không sử dụng nội dung người dùng của Onlearn for Education để đào tạo AI.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Khi tải nội dung lên Onlearn, bạn đang đảm bảo rằng mình có quyền đối với nội dung đó.
                            Chúng tôi không bao giờ có bất kỳ quyền sở hữu nào đối với nội dung của bạn nhưng chúng tôi cần bạn cấp cho chúng
                            tôi một số quyền nhất định để lưu trữ nội dung đó và chuẩn bị sẵn sàng để bạn sử dụng trong khóa học của mình.
                        </Alert>
                    </li>
                    <li>
                        <h6>
                            Nội dung được cấp phép.
                        </h6>
                        <p>
                            Bạn có thể sử dụng nội dung được cấp phép liên quan đến dịch vụ.
                            Việc sử dụng nội dung được cấp phép phải tuân theo các quyền và hạn chế cấp phép bổ sung được quy định trong thỏa thuận cấp phép nội dung.
                            Các quyền và hạn chế cấp phép hiện hành khác nhau tùy thuộc vào loại và nguồn của nội dung được cấp phép.
                            Bạn có thể xác định điều khoản cấp phép nội dung nào được áp dụng bằng cách di chuột qua mục nội dung được cấp phép và nhấp vào biểu tượng thông tin.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Một số hạn chế nhất định áp dụng cho cách bạn có thể sử dụng nội dung nào đó và những gì bạn có thể làm với các khóa học mà bạn đưa nội dung đó vào.
                            Các hạn chế khác nhau tùy theo loại và nguồn của nội dung.
                        </Alert>
                    </li>
                    <li>
                        <h6>
                            Khóa học.
                        </h6>
                        <p>
                            Khóa học của bạn có thể bao gồm sự kết hợp giữa nội dung người dùng và nội dung được cấp phép.
                            Mặc dù bạn vẫn giữ quyền sở hữu nội dung người dùng của mình nhưng mọi việc sử dụng khóa học có chứa
                            nội dung được cấp phép đều phải tuân theo các điều khoản hiện hành của Thỏa thuận cấp phép nội dung.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Chúng tôi không bao giờ sở hữu khóa học của bạn nhưng có thể có một số hạn chế nhất định tùy thuộc vào loại nội dung mà bạn đưa vào khóa học của mình.
                        </Alert>
                    </li>
                    <li>
                        <h6>
                            Xuất bản khóa học của bạn.
                        </h6>
                        <p>
                            Bạn có thể xuất bản khóa học với những người khác trong dịch vụ, thông qua dịch vụ của bên thứ ba hoặc qua liên kết.
                            Onlearn không chịu trách nhiệm liên quan đến việc khóa học như vậy và việc Onlearn hỗ trợ hoạt động đó hoặc việc dịch vụ thực
                            hiện hành động chia sẻ công khai khóa học theo hướng dẫn của bạn sẽ không bị coi là vi phạm bất kỳ nghĩa vụ nào của Onlearn theo các điều khoản này.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Có một số cách để chia sẻ khóa học của bạn với mọi người. Bạn chịu trách nhiệm về việc chia sẻ và cách bạn thực hiện điều đó.
                        </Alert>
                    </li>
                </ol>
                {/* <h5>
                    5. Thanh toán
                </h5>
                <ol type="a">
                    <li>
                        <h6>
                            Đăng ký và gia hạn.
                        </h6>
                        <p>

                        </p>
                    </li>
                    <li>
                        <h6>
                            Thuế.
                        </h6>
                        <p>

                        </p>
                    </li>
                    <li>
                        <h6>
                            Hoàn tiền.
                        </h6>
                        <p>

                        </p>
                    </li>
                    <li>
                        <h6>
                            Thay đổi về giá.
                        </h6>
                        <p>

                        </p>
                    </li>
                </ol>
                <p>

                </p>
                <Alert className="mb-3" severity="info">

                </Alert> */}
                <h5>
                    5. Sở hữu trí tuệ của Onlearn
                </h5>
                <p>
                    Trừ khi được quy định rõ ràng trong các điều khoản này, tất cả các quyền sở hữu trí tuệ trong và đối với
                    dịch vụ cũng như Nội dung được cấp phép vẫn là tài sản duy nhất của Onlearn và những người cấp phép của Onlearn.
                    Bạn giao cho Onlearn mọi đề xuất, ý tưởng, yêu cầu nâng cao hoặc phản hồi khác mà bạn cung cấp cho Onlearn liên quan
                    đến dịch vụ hoặc sản phẩm của Onlearn. Onlearn sở hữu tất cả nội dung, dữ liệu, phần mềm, phát minh, ý tưởng cũng như
                    công nghệ và tài sản trí tuệ khác mà Onlearn phát triển liên quan đến dịch vụ và các sản phẩm của Onlearn.
                </p>
                <Alert className="mb-3" severity="info">
                    Chúng tôi nhận được những ý tưởng tuyệt vời về cách cải thiện Onlearn từ người dùng của mình.
                    Nếu bạn chia sẻ phản hồi hoặc ý tưởng với chúng tôi, bạn sẽ cho phép chúng tôi sử dụng thông tin đó để cải thiện
                    Onlearn và chúng tôi sở hữu mọi cải tiến mà chúng tôi thực hiện.
                </Alert>
                <h5>
                    6. Từ chối trách nhiệm bảo hành
                </h5>
                <p>
                    Dịch vụ được cung cấp trên cơ sở “nguyên trạng” và “sẵn có”.
                    Trong phạm vi tối đa được pháp luật hiện hành cho phép và tuân theo mọi quyền và biện pháp khắc phục
                    không thể loại trừ mà bạn có thể có theo luật hiện hành, Onlearn, người cấp phép và nhà cung cấp của Onlearn từ
                    chối rõ ràng mọi bảo đảm dưới bất kỳ hình thức nào, dù rõ ràng hay ngụ ý, bao gồm , nhưng không giới hạn ở các
                    bảo đảm về khả năng bán được, sự phù hợp cho một mục đích cụ thể hoặc không vi phạm. Onlearn không đảm bảo rằng việc
                    sử dụng dịch vụ của bạn sẽ không bị gián đoạn hoặc không có lỗi. Onlearn không đảm bảo rằng họ sẽ xem xét tính chính
                    xác của dữ liệu của bạn hoặc sẽ bảo toàn hoặc duy trì dữ liệu của bạn mà không bị mất. Bạn hiểu rằng việc sử dụng
                    dịch vụ nhất thiết liên quan đến việc truyền dữ liệu của bạn qua các mạng mà Onlearn không sở hữu, vận hành hoặc kiểm
                    soát và Onlearn không chịu trách nhiệm về bất kỳ dữ liệu nào của bạn bị mất, thay đổi, bị chặn hoặc lưu trữ trên các mạng đó.
                    Onlearn sẽ không chịu trách nhiệm về sự chậm trễ, gián đoạn, lỗi dịch vụ hoặc các vấn đề khác vốn có trong việc sử dụng internet
                    và thông tin liên lạc điện tử hoặc các hệ thống khác nằm ngoài tầm kiểm soát hợp lý của Onlearn.
                </p>
                <Alert className="mb-3" severity="info">
                    Chúng tôi cung cấp dịch vụ theo nguyên trạng và không thể chịu trách nhiệm về những thứ nằm ngoài tầm kiểm soát của chúng tôi.
                </Alert>
                <h5>
                    7. Dịch vụ của bên thứ ba
                </h5>
                <p>
                    Bạn có thể chọn sử dụng dịch vụ cùng với các trang web, nền tảng hoặc ứng dụng của bên thứ ba
                    (bao gồm nhưng không giới hạn ở những trang web, nền tảng có sẵn tại onlearn.fpt-ec.click) (“(Các) dịch vụ của bên thứ ba”).
                    Việc bạn sử dụng dịch vụ của bên thứ ba phải tuân theo các điều khoản và điều kiện áp dụng cho dịch vụ của bên thứ ba đó.
                    Onlearn không đưa ra tuyên bố hay bảo đảm nào liên quan đến dịch vụ của bên thứ ba và từ chối rõ ràng mọi trách nhiệm pháp lý phát sinh
                    từ việc bạn sử dụng dịch vụ của bên thứ ba.
                </p>
                <Alert className="mb-3" severity="info">
                    Trong Onlearn, bạn có thể sử dụng các ứng dụng do bên thứ ba tạo.
                    Những ứng dụng đó có thể có bộ điều khoản riêng áp dụng cho bạn và vì ứng dụng đó do bên thứ ba tạo nên chúng tôi không thể chịu trách nhiệm về chúng.
                </Alert>
                <h5>
                    8. Nghĩa vụ bồi thường của bạn
                </h5>
                <p>
                    Bạn đồng ý, trong phạm vi được pháp luật cho phép, bảo vệ, bồi thường và giữ cho Onlearn cũng như các chi nhánh, cán bộ, giám đốc, đại lý,
                    người cấp phép và nhân viên của Onlearn khỏi bị tổn hại trước bất kỳ và tất cả các khiếu nại, chi phí, thiệt hại, tổn thất, trách nhiệm
                    pháp lý và phí tổn (bao gồm phí và chi phí luật sư hợp lý) phát sinh từ hoặc liên quan đến (i) việc bạn vi phạm các Điều khoản này hoặc
                    (ii) Nội dung Người dùng của bạn.
                </p>
                <Alert className="mb-3" severity="info">
                    Nếu Onlearn bị tổn hại do nội dung của bạn hoặc do bạn vi phạm các điều khoản này hoặc nếu ai đó cố gắng buộc Onlearn phải
                    chịu trách nhiệm về nội dung hoặc hành vi vi phạm của bạn, thì bạn sẽ phải chịu trách nhiệm về mọi chi phí mà Onlearn phải gánh chịu và bảo vệ Onlearn.
                </Alert>
                <h5>
                    9. Trách nhiệm hữu hạn
                </h5>
                <p>
                    Trong mọi trường hợp, trách nhiệm pháp lý tích lũy tổng hợp của một trong hai bên dưới đây
                    (dù là trong hợp đồng, vi phạm hợp đồng, sơ suất, trách nhiệm pháp lý nghiêm ngặt do vi phạm hợp đồng hay theo đạo luật hay cách khác)
                    sẽ không vượt quá mức lớn hơn (i) 10.000.000vnd hoặc (ii) phí đăng ký mà bạn trả cho Onlearn trong khoảng thời gian mười hai tháng trước sự kiện
                    hoặc sự việc làm phát sinh trách nhiệm pháp lý đó. Các giới hạn nêu trên sẽ không áp dụng đối với các trách nhiệm pháp lý phát sinh từ
                    nghĩa vụ bồi thường của bạn hoặc việc bạn vi phạm phần có tiêu đề 'hạn chế sử dụng dịch vụ'.
                </p>
                <p>
                    Trong mọi trường hợp, một trong hai bên sẽ không chịu trách nhiệm pháp lý về bất kỳ thiệt hại,
                    tổn thất hoặc chi phí mang tính hậu quả, ngẫu nhiên, gián tiếp, đặc biệt, mang tính răn đe hoặc
                    trừng phạt nào (bao gồm nhưng không giới hạn ở gián đoạn kinh doanh, kinh doanh bị mất hoặc lợi nhuận bị mất)
                    ngay cả khi đã được thông báo về việc của họ. có thể tồn tại và bất chấp sự thất bại của mục đích thiết yếu
                    của bất kỳ biện pháp khắc phục nào. Các giới hạn nêu trên sẽ không áp dụng đối với các trách nhiệm pháp lý
                    phát sinh từ nghĩa vụ bồi thường của bạn hoặc việc bạn vi phạm phần có tiêu đề 'hạn chế sử dụng dịch vụ'.
                </p>
                <p>
                    Onlearn không chịu trách nhiệm và không chịu trách nhiệm pháp lý về nội dung của người dùng.
                </p>
                <p>
                    Các điều khoản này không ảnh hưởng đến các quyền của người tiêu dùng mà pháp luật không thể từ bỏ hoặc hạn chế.
                    Các điều khoản này không loại trừ hoặc giới hạn trách nhiệm pháp lý phát sinh từ sự sơ suất, gian lận hoặc hành vi sai trái cố ý của một trong hai bên.
                </p>
                <h5>
                    10. Điều khoản và chấm dứt
                </h5>
                <ol type="a">
                    <li>
                        <h6>Điều khoản.</h6>
                        <p>
                            Các điều khoản này sẽ có hiệu lực vào lần đầu tiên bạn truy cập dịch vụ và sẽ tiếp tục có hiệu lực đầy đủ cho đến khi tài khoản của bạn bị xóa hoặc chấm dứt.
                        </p>
                    </li>
                    <li>
                        <h6>Vi phạm.</h6>
                        <p>
                            Nếu Onlearn, theo quyết định hợp lý của mình, xác định rằng bạn hoặc việc bạn sử dụng dịch vụ, nội dung người dùng hoặc khóa học của bạn vi phạm các
                            điều khoản này, bao gồm nhưng không giới hạn ở chính sách sử dụng được chấp nhận của Onlearn, phần có tiêu đề 'Hạn chế sử dụng dịch vụ ,
                            ” hoặc Phần có tiêu đề “Chống phân biệt đối xử” (bất kỳ hành động nào trong số đó được coi là “Vi phạm”) Onlearn có thể thực hiện một hoặc nhiều hành
                            động sau: (i) xóa nội dung hoặc khóa học của người dùng bị cấm; (ii) đình chỉ quyền truy cập của bạn vào dịch vụ; (iii) chấm dứt và xóa tài khoản
                            của bạn cùng với tất cả khóa học và nội dung người dùng được liên kết với tài khoản đó (iv) cấm bạn sử dụng dịch vụ vĩnh viễn; và/hoặc (v)
                            tiết lộ nội dung hoặc khóa học của người dùng bị cấm cho các cơ quan chính phủ thích hợp.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Nếu bạn vi phạm các quy tắc, chúng tôi có quyền xóa bạn và mọi thứ trong tài khoản của bạn khỏi dịch vụ.
                        </Alert>
                    </li>
                    <li>
                        <h6>Hiệu lực của việc chấm dứt.</h6>
                        <p>
                            Trong trường hợp chấm dứt đăng ký của bạn vì lý do Onlearn mặc định, Onlearn sẽ hoàn lại, theo tỷ lệ, mọi khoản phí trả trước cho dịch vụ
                            trong khoảng thời gian bắt đầu từ ngày chấm dứt có hiệu lực cho đến khi kết thúc đăng ký hiện tại của bạn.
                            Trong trường hợp bạn chấm dứt đăng ký do vi phạm, bạn sẽ không nhận được bất kỳ khoản hoàn trả nào và sẽ ngay lập tức thanh
                            toán mọi khoản phí chưa thanh toán cho thời gian đăng ký còn lại của mình.
                        </p>
                        <p>
                            Khi đăng ký của bạn hết hạn hoặc chấm dứt, bạn phải ngừng sử dụng dịch vụ.
                            Bạn sẽ mất quyền truy cập vào khóa học, nội dung người dùng và bất kỳ thông tin nào khác được tải lên dịch vụ
                            (và chúng tôi có thể xóa tất cả dữ liệu đó trừ khi bị pháp luật cấm) sau khi hết hạn hoặc chấm dứt đăng ký của bạn.
                            Nội dung người dùng có trong mọi khóa học được chia sẻ sẽ tiếp tục có sẵn trong khóa học đó ngay cả sau khi đăng ký của bạn hết hạn.
                            Trừ khi tài khoản của bạn bị chấm dứt do vi phạm, bạn có thể tải xuống hoặc xuất Nội dung và khóa học của người dùng bằng cách sử dụng
                            chức năng của dịch vụ trước khi hết hạn hoặc chấm dứt đăng ký. Nếu tài khoản của bạn đã bị chấm dứt do vi phạm, bạn không được tạo tài
                            khoản mới trên bất kỳ dịch vụ Onlearn nào trừ khi bạn nhận được sự cho phép bằng văn bản của Onlearn.
                        </p>
                    </li>
                    <li>
                        <h6>Sự tồn tại của các điều khoản.</h6>
                        <p>
                            Các phần có tiêu đề “Điều khoản và chấm dứt”, “Thanh toán”, “Sở hữu trí tuệ của Onlearn”, “Giới hạn trách nhiệm pháp lý”,
                            “Bồi thường” và bao gồm cả “Các mục khác”, sẽ vẫn có hiệu lực sau khi các điều khoản này hết hạn hoặc chấm dứt.
                        </p>
                    </li>
                </ol>
                <h5>
                    11. Điều khoản khác
                </h5>
                <ol type="a">
                    <li>
                        <h6>Tuân thủ luật áp dụng.</h6>
                        <p>
                            Bạn đồng ý tuân theo tất cả các luật, hiệp ước và quy định hiện hành của địa phương, tiểu bang, quốc gia và nước ngoài liên quan đến việc bạn sử dụng dịch vụ.
                            Onlearn đồng ý tuân theo tất cả các luật, hiệp ước và quy định hiện hành của địa phương, quốc gia liên quan đến việc cung cấp dịch vụ.
                        </p>
                    </li>
                    <li>
                        <h6>Luật chi phối.</h6>
                        <p>
                            Các điều khoản này sẽ được điều chỉnh và hiểu theo luật pháp của nước Việt Nam, bất kể xung đột với các quy định của pháp luật.
                        </p>
                    </li>
                    <li>
                        <h6>Giải quyết tranh chấp.</h6>
                        <p>

                        </p>
                    </li>
                    <li>
                        <h6>Thực thể hợp đồng Onlearn.</h6>
                        <p>
                            Thực thể Onlearn ký hợp đồng với bạn theo các điều khoản này và địa chỉ mà bạn sẽ gửi thông báo pháp lý tùy thuộc vào địa chỉ thanh toán của bạn.
                        </p>
                        <p>
                            Địa chỉ thanh toán của bạn ở bất kỳ quốc gia nào:
                        </p>
                        <ul className="mb-3">
                            <li>
                                Tổ chức Onlearn tham gia vào các điều khoản này là công ty giới hạn tư nhân Onlearn.
                            </li>
                            <li>
                                Thông báo pháp lý phải được gửi tới: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thủ Đức, Thành phố Hồ Chí Minh.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h6>Tiêu đề và giải thích.</h6>
                        <p>
                            Các tiêu đề được sử dụng trong các điều khoản này và các hộp giải thích được cung cấp chỉ nhằm mục đích thuận tiện
                            và sẽ không ảnh hưởng đến ý nghĩa hoặc cách giải thích của điều khoản hoặc bất kỳ phần nào trong đó.
                        </p>
                    </li>
                    <li>
                        <h6>Tính tách rời.</h6>
                        <p>
                            Nếu một điều khoản cụ thể của các điều khoản này được phát hiện là không hợp lệ hoặc không thể thi hành thì điều khoản đó
                            sẽ không ảnh hưởng đến các điều khoản khác và điều khoản sẽ được hiểu ở mọi khía cạnh như thể điều khoản không hợp lệ hoặc
                            không thể thi hành đó đã bị hạn chế hoặc bỏ qua ở mức tối thiểu cần thiết.
                        </p>
                    </li>
                    <li>
                        <h6>Miễn trừ.</h6>
                        <p>
                            Việc Onlearn từ bỏ rõ ràng hoặc không thực thi bất kỳ điều khoản nào trong các Điều khoản này sẽ không được hiểu là sự từ bỏ hiện
                            tại hoặc tương lai đối với điều khoản đó cũng như không ảnh hưởng đến khả năng của Onlearn trong việc thực thi bất kỳ điều khoản nào sau đó.
                        </p>
                    </li>
                    <li>
                        <h6>Thông báo.</h6>
                        <p>
                            Tất cả các thông báo cần thiết cho bạn sẽ được gửi đến địa chỉ email được liên kết với tài khoản của bạn hoặc thông qua các phương tiện được pháp luật cho phép khác.
                        </p>
                    </li>
                    <li>
                        <h6>Những thay đổi đối với các điều khoản này.</h6>
                        <p>
                            Chúng tôi có thể sửa đổi các điều khoản này (và mọi chính sách hoặc thỏa thuận được tham chiếu trong các điều khoản này) bất kỳ lúc nào.
                            Chúng tôi sẽ đăng phiên bản mới nhất của các điều khoản này lên onlearn.fpt-ec.click. Chúng tôi sẽ cung cấp cho bạn thông báo trước hợp lý về bất kỳ thay
                            đổi nào đối với điều khoản mà theo quyết định riêng của chúng tôi, ảnh hưởng bất lợi nghiêm trọng đến quyền của bạn hoặc việc sử dụng dịch vụ của bạn.
                            Chúng tôi có thể cung cấp cho bạn thông báo này qua dịch vụ và/hoặc qua email đến địa chỉ email được liên kết với tài khoản của bạn.
                            Bằng cách tiếp tục sử dụng dịch vụ sau khi mọi điều khoản sửa đổi có hiệu lực, bạn đồng ý bị ràng buộc bởi điều khoản mới.
                        </p>
                    </li>
                    <li>
                        <h6>Những thay đổi đối với dịch vụ.</h6>
                        <p>
                            Onlearn có thể thêm, thay đổi hoặc xóa các tính năng hoặc chức năng của dịch vụ; sửa đổi hoặc đưa ra các hạn chế đối với việc lưu trữ hoặc các tính năng khác;
                            hoặc ngừng hoàn toàn dịch vụ bất kỳ lúc nào. Nếu bạn đang đăng ký trả phí và Onlearn ngừng dịch vụ bạn đang sử dụng trong quá trình đăng ký,
                            Onlearn sẽ di chuyển hoặc cung cấp cho bạn một dịch vụ tương tự do Onlearn cung cấp (nếu có) và nếu không thể làm như vậy,
                            Onlearn sẽ cung cấp cho bạn hoàn trả theo tỷ lệ các khoản phí trả trước cho thời gian đăng ký còn lại của bạn.
                        </p>
                    </li>
                    <li>
                        <h6>Toàn bộ thỏa thuận.</h6>
                        <p>
                            Các điều khoản này cũng như các điều khoản và chính sách được tham chiếu ở đây cấu thành toàn bộ thỏa thuận giữa bạn và Onlearn đối với dịch vụ.
                            Các điều khoản này thay thế mọi tuyên bố, thỏa thuận hoặc hiểu biết trước đây giữa bạn và Onlearn, dù bằng văn bản hay bằng lời nói, liên quan đến dịch vụ,
                            bao gồm cả các phiên bản trước của điều khoản. Tất cả các điều khoản, điều kiện hoặc quy định về sản phẩm đã thanh toán sẽ không có hiệu lực cho dù có chấp nhận
                            sản phẩm đã thanh toán đó.
                        </p>
                    </li>
                </ol>
            </div>
            <Footer />
        </Fragment >
    );
};

export default LandingPage;