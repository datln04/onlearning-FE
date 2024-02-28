import React, { Fragment } from "react";
import Header from "../../components/Landing/Header/Header";
import Footer from "../../components/Landing/Footer/Footer";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
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
                        <strong>CHÍNH SÁCH BẢO MẬT</strong>
                    </Typography>
                </div>
            </div>
            <div className="container mt-3">
                <p>
                    Chính sách bảo mật này được cập nhật lần cuối vào ngày 6 tháng 12 năm 2023.
                    Xem các phiên bản trước của chính sách bảo mật trong kho lưu trữ chính sách của chúng tôi.
                </p>
                <p>
                    Văn bản được đánh dấu nhằm mục đích cung cấp bản tóm tắt bằng tiếng Việt đơn giản về chính sách bảo mật của chúng tôi.
                    Hãy đảm bảo bạn đã đọc nội dung chính vì bản tóm tắt bằng tiếng Việt đơn giản chỉ là bản tóm tắt và không nắm bắt được tất cả các thuật ngữ.
                </p>
                <h3>Chính sách này bao gồm những gì.</h3>
                <p>
                    Chào mừng bạn đến với Onlearn, dịch vụ trực tuyến và di động của nhóm đồ án Onlearn.
                    Chính sách bảo mật của chúng tôi giải thích cách Onlearn thu thập, sử dụng, tiết lộ
                    và bảo vệ thông tin áp dụng cho nền tảng giao tiếp trực quan( dịch vụ) của chúng tôi cũng như
                    các lựa chọn của bạn về việc thu thập và sử dung thông tin của mình. Các thuật ngữ viết hoa không được
                    xác định trong chính sách bảo mật này sẽ có ý nghĩa như được nêu trong{" "}
                    <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>Điều khoản sử dụng</Link>{" "}
                    của chúng tôi. Nếu bạn không muốn thông tin của mình được xử lý theo Chính sách quyền riêng
                    tư này nói chung hoặc bất kỳ phần nào trong đó, bạn không nên sử dụng dịch vụ của chúng tôi.
                    Chính sách này áp dụng cho tất cả người dùng dịch vụ.
                </p>
                <Alert className="mb-3" severity="info">
                    Tóm tắt: Chào mừng, đây là chính sách của chúng tôi về quyền riêng tư.
                    Chính sách này quy định cách Onlearn thu thập và sử dụng thông tin mà chúng tôi thu thập về bạn khi bạn sử dụng dịch vụ.
                    Chính sách này cũng giải thích những lựa chọn mà bạn có thể thực hiện về cách chúng tôi sử dụng thông tin của bạn.
                </Alert>
                <h5>1. Thông tin chúng tôi thu thập.</h5>
                <p>Chúng tôi thu thập các loại thông tin sau về bạn:</p>
                <ol type="a">
                    <li><h6>Thông tin bạn cung cấp trực tiếp cho chúng tôi.</h6>
                        <p>
                            Chúng tôi có thể yêu cầu một số thông tin nhất định khi bạn đăng ký tài khoản
                            Onlearn hoặc trao đổi thư từ với chúng tôi
                            (chẳng hạn như tên người dùng, họ và tên, ngày sinh, số điện thoại, nghề nghiệp,
                            địa chỉ thực và địa chỉ email).
                        </p>
                        <p>
                            Chúng tôi cũng thu thập bất kỳ tin nhắn nào bạn gửi cho chúng tôi thông qua dịch vụ
                            (chẳng hạn như phản hồi của người dùng, truy vấn tìm kiếm) và có thể thu
                            thập thông tin bạn cung cấp trong Nội dung người dùng mà bạn đăng tải lên dịch vụ
                            (chẳng hạn như văn bản và ảnh, video, các tệp phương tiện bạn tải lên để sử dụng trong khóa học của mình).
                            Chúng tôi sử dụng thông tin này để vận hành, duy trì và cung cấp các tính năng cũng
                            như chức năng của dịch vụ cho bạn, để liên lạc với bạn và giải quyết mọi vấn đề bạn nêu ra về dịch vụ.
                        </p>
                        <p>
                            Nếu bạn không cung cấp thông tin cá nhân của mình cho chúng tôi, bạn có thể không truy
                            cập hoặc sử dụng dịch vụ của chúng tôi hoặc trải nghiệm sử dụng dịch vụ của chúng tôi có thể không thú vị bằng.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Chúng tôi thu thập thông tin về bạn mà bạn chọn cung cấp cho chúng tôi,
                            chẳng hạn như khi bạn đăng ký tài khoản,
                            sử dụng dịch vụ hoặc tương tác với chúng tôi.
                        </Alert>
                    </li>
                    <li><h6>Thông tin chúng tôi thu thập từ bạn một cách tự động.</h6>
                        <p>
                            Chúng tôi sẽ trực tiếp thu thập hoặc tạo một số thông tin nhất định về việc bạn sử dụng dịch vụ
                            (chẳng hạn như dữ liệu hoạt động của người dùng, dữ liệu sự kiện phân tích và dữ liệu luồng nhấp chuột)
                            để phân tích dữ liệu và học máy, đồng thời giúp chúng tôi đo lường lưu lượng truy cập và xu hướng sử dụng cho dịch vụ.
                            Chúng tôi cũng có thể sử dụng các công cụ phân tích của bên thứ ba để tự động thu thập thông tin được gửi bởi trình duyệt hoặc thiết bị di động của bạn,
                            bao gồm các trang bạn truy cập và các thông tin khác hỗ trợ chúng tôi cải thiện dịch vụ.
                            Để biết thêm thông tin, vui lòng xem các đoạn bên dưới về thông tin cookie, thông tin tệp nhật ký, số nhận dạng thiết bị và dữ liệu vị trí.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Chúng tôi thu thập và tạo ra một số thông tin nhất định về cách bạn sử dụng dịch vụ của chúng tôi một cách tự động.
                            Điều này giúp chúng tôi cung cấp và cải thiện dịch vụ cho bạn.
                        </Alert>
                    </li>
                    <li><h6>Thông tin cookie và thông tin được lấy từ các công nghệ tương tự.</h6>
                        <p>
                            Khi bạn truy cập dịch vụ, chúng tôi (và các đối tác bên thứ ba của chúng tôi) sẽ gửi cookie — các tệp văn bản nhỏ chứa một chuỗi ký tự chữ và số —
                            đến máy tính của bạn để nhận dạng duy nhất trình duyệt của bạn và cho phép Onlearn thực hiện những việc như giúp bạn đăng nhập nhanh hơn,
                            nâng cao chất lượng dịch vụ. việc điều hướng của bạn qua trang web, ghi nhớ các tùy chọn của bạn và nói chung là cải thiện trải nghiệm người dùng.
                            Cookie cũng truyền tải thông tin cho chúng tôi về cách bạn sử dụng dịch vụ (ví dụ: các trang bạn xem, liên kết bạn nhấp vào và các hành động khác bạn thực hiện trên dịch vụ)
                            và cho phép chúng tôi hoặc các đối tác kinh doanh của chúng tôi theo dõi việc sử dụng dịch vụ của bạn theo thời gian .
                            Chúng cũng cho phép chúng tôi đo lường lưu lượng truy cập và xu hướng sử dụng dịch vụ, phân phối các quảng cáo được cá nhân hóa mà bạn có thể quan tâm
                            cũng như đo lường mức độ hiệu quả của chúng, đồng thời tìm những người dùng dịch vụ mới tiềm năng.
                        </p>
                        <p>
                            Bạn có thể kiểm soát hoặc đặt lại cookie và các công nghệ tương tự thông qua trình duyệt web của mình,
                            điều này sẽ cho phép bạn tùy chỉnh tùy chọn cookie của mình và từ chối tất cả cookie hoặc cho biết khi nào cookie được gửi.
                            Tuy nhiên, một số tính năng của dịch vụ có thể không hoạt động bình thường nếu khả năng chấp nhận cookie bị tắt.
                            Để biết thêm thông tin về cách chúng tôi sử dụng cookie và các công nghệ khác cũng như cách bạn có thể kiểm soát chúng,
                            vui lòng đọc{" "}
                            <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}> Chính sách cookie</Link>{" "} của chúng tôi.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Chúng tôi sử dụng cookie để giúp bạn sử dụng Onlearn và cho các mục đích kinh doanh khác.
                            Để biết thêm thông tin về cách chúng tôi sử dụng cookie và cách bạn có thể kiểm soát chúng, vui lòng xem Chính sách cookie của chúng tôi.
                        </Alert>
                    </li>
                    <li><h6>Thông tin tập tin nhật ký.</h6>
                        <p>
                            Thông tin tệp nhật ký được trình duyệt hoặc thiết bị di động của bạn tự động báo cáo mỗi khi bạn truy cập dịch vụ.
                            Khi bạn sử dụng dịch vụ của chúng tôi, máy chủ của chúng tôi sẽ tự động ghi lại thông tin tệp nhật ký nhất định.
                            Các nhật ký máy chủ này có thể bao gồm thông tin ẩn danh như yêu cầu web, loại trình duyệt, trang giới thiệu/thoát và URL,
                            số lần nhấp chuột và cách bạn tương tác với các liên kết trên dịch vụ, tên miền, trang đích, trang đã xem và các thông tin khác.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Bất cứ khi nào bạn tải một trang trình duyệt từ Onlearn, trình duyệt của bạn sẽ gửi cho chúng tôi thông tin về trang đó và các
                            tương tác của bạn với dịch vụ của chúng tôi. Thông tin đó được lưu trữ trên máy chủ của chúng tôi.
                        </Alert>
                    </li>
                    <li><h6>Số nhận dạng thiết bị.</h6>
                        <p>
                            Khi bạn truy cập dịch vụ trên một thiết bị (bao gồm cả điện thoại thông minh hoặc máy tính bảng),
                            chúng tôi có thể truy cập, thu thập và/hoặc giám sát một hoặc nhiều “số nhận dạng thiết bị”, chẳng hạn như số nhận dạng duy nhất trên toàn cầu (“UUID”).
                            Mã nhận dạng thiết bị là các tệp dữ liệu nhỏ nhận dạng duy nhất thiết bị di động của bạn.
                            Mã nhận dạng thiết bị có thể truyền tải thông tin cho chúng tôi về cách bạn sử dụng dịch vụ.
                            Mã nhận dạng thiết bị có thể vẫn tồn tại lâu dài trên thiết bị của bạn để giúp bạn đăng nhập và điều hướng dịch vụ tốt hơn.
                            Một số tính năng của dịch vụ có thể không hoạt động bình thường nếu việc sử dụng số nhận dạng thiết bị bị suy giảm.
                            Mã nhận dạng thiết bị được Onlearn sử dụng bao gồm ID quảng cáo Android và Mã nhận dạng quảng cáo iOS.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Điện thoại hoặc thiết bị của bạn gửi cho chúng tôi thông tin về việc sử dụng của bạn.
                        </Alert>
                    </li>
                    <li><h6>Dữ liệu vị trí.</h6>
                        <p>
                            Onlearn thu thập thông tin để hiểu vị trí của người dùng vì một số lý do.
                            Nó giúp Onlearn bản địa hóa và cá nhân hóa nội dung, tuân thủ luật pháp địa phương, thực hiện phân tích tổng hợp,
                            hiểu rõ liệu người dùng có sử dụng Onlearn cho mục đích cộng đồng, kinh doanh hay giáo dục hay không,
                            cải thiện hiệu quả quảng cáo và ước tính nghĩa vụ thuế của Onlearn.
                        </p>
                        <p>
                            Onlearn có thể thu thập vị trí chính xác hoặc gần đúng của bạn:
                            <ul>
                                <li>từ bạn, khi bạn cung cấp, chỉnh sửa hoặc xác nhận vị trí của mình (ví dụ: khi bạn sử dụng dịch của chúng tôi);</li>
                                <li>bằng cách suy ra vị trí của bạn từ địa chỉ IP của bạn;</li>
                                <li>từ các đối tác của chúng tôi hoặc nhà cung cấp thanh toán của bạn.</li>
                            </ul>
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Onlearn có thể thu thập và sử dụng dữ liệu vị trí của bạn cho mục đích cá nhân hóa, phân tích, quảng cáo và thuế.
                        </Alert>
                    </li>
                    <li><h6>Nội dung trong tài khoản của bạn.</h6>
                        <p>
                            Chúng tôi nhận được nội dung bạn tạo trong tài khoản Onlearn và phương tiện bạn tải lên để sử dụng trong tài khoản đó,
                            chẳng hạn như hình ảnh, tài liệu, video và các dữ liệu về nội dung của bạn.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Onlearn thu thập nội dung bạn tải lên tài khoản của mình.
                        </Alert>
                    </li>
                </ol>
                <h5>2. Cách chúng tôi sử dụng thông tin của bạn.</h5>
                <ul>
                    <li><h6>Cung cấp cho bạn dịch vụ:</h6>
                        <p>
                            Chúng tôi sử dụng thông tin mà bạn trực tiếp cung cấp cho chúng tôi để cung cấp dịch vụ cho bạn.
                            Điều này bao gồm việc cho phép bạn đăng nhập vào Onlearn, vận hành và duy trì dịch vụ, cấp cho bạn quyền
                            truy cập vào các khóa học của mình và tính phí cho các giao dịch bạn thực hiện thông qua dịch vụ.
                            Chúng tôi cũng sử dụng thông tin chúng tôi thu thập về bạn một cách tự động để ghi nhớ thông tin về bạn để bạn không phải nhập
                            lại thông tin đó trong lần truy cập hoặc lần tiếp theo bạn truy cập trang web.
                        </p>
                    </li>
                    <li><h6>Để phân tích dữ liệu:</h6>
                        <p>
                            Chúng tôi sử dụng thông tin về bạn để giúp chúng tôi cải thiện dịch vụ Onlearn và trải nghiệm của người dùng,
                            bao gồm bằng cách giám sát các số liệu tổng hợp như tổng số khách truy cập, lưu lượng truy cập và mô hình nhân khẩu học.
                        </p>
                    </li>
                    <li><h6>Dành cho phân tích và học máy:</h6>
                        <p>
                            Chúng tôi có thể phân tích hoạt động, nội dung, nội dung tải lên phương tiện và dữ liệu liên quan trong tài khoản của bạn
                            để cung cấp và tùy chỉnh dịch vụ cũng như đào tạo các thuật toán, mô hình cũng như sản phẩm và dịch vụ AI của chúng tôi bằng
                            cách sử dụng máy học để phát triển, cải thiện và cung cấp dịch vụ của chúng tôi. Bạn có thể quản lý việc sử dụng dữ liệu
                            của mình để đào tạo AI trong trang cài đặt quyền riêng tư trong cài đặt tài khoản của bạn. Những hoạt động này bao gồm nhưng không giới hạn ở:
                        </p>
                        <ul>
                            <li>
                                Phát hiện nội dung bị cấm theo <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>Điều khoản sử dụng</Link>{" "} được chấp nhận của chúng tôi nhằm mục đích kiểm duyệt và bảo mật
                                (ví dụ: tài liệu khiêu dâm hoặc được bảo vệ bản quyền);
                            </li>
                            <li>
                                Dự đoán gói đăng ký hoặc sản phẩm phù hợp nhất để người dùng điều chỉnh thông tin liên lạc và quảng cáo;
                            </li>
                            <li>
                                Cụm từ tìm kiếm và dữ liệu tương tác của kết quả tìm kiếm tương ứng để xây dựng thuật toán mang lại kết quả thiết kế phù hợp nhất.
                            </li>
                        </ul>
                    </li>
                    <li><h6>Tùy chỉnh dịch vụ cho bạn:</h6>
                        <p>
                            Chúng tôi sử dụng và kết hợp thông tin bạn cung cấp cho chúng tôi và thông tin về bạn mà chúng tôi tự động thu thập và nhận từ các nguồn khác
                            (bao gồm thông tin chúng tôi nhận được trong và ngoài dịch vụ của chúng tôi) và kết hợp thông tin đó với thông tin về hành vi của những người dùng khác
                            để đảm bảo rằng việc bạn sử dụng của dịch vụ được tùy chỉnh theo nhu cầu của bạn. Ví dụ: để đề xuất các lĩnh vực, các thành phần của bài học,
                            thành phần và phông chữ có thể hữu ích cho bạn trong một nội dung bài học, chúng tôi có thể sử dụng thông tin bắt nguồn từ hành vi trước đây của bạn trên
                            dịch vụ của chúng tôi, việc những người khác làm việc trên các thiết kế tương tự sử dụng các yếu tố này và các suy luận khác thông tin.
                        </p>
                    </li>
                    <li><h6>Để liên lạc với bạn về dịch vụ:</h6>
                        <p>
                            Chúng tôi sử dụng thông tin liên hệ của bạn để liên lạc với bạn và gửi thông tin liên lạc về các yếu tố quan trọng của dịch vụ.
                            Ví dụ: chúng tôi có thể gửi cho bạn email về các vấn đề kỹ thuật, cảnh báo bảo mật hoặc các vấn đề hành chính.
                        </p>
                    </li>
                    <li><h6>Để cải thiện dịch vụ:</h6>
                        <p>
                            Chúng tôi sử dụng thông tin liên hệ của bạn để liên hệ với bạn về việc tham gia các cuộc khảo sát của chúng tôi
                            hoặc về các tính năng và ưu đãi liên quan đến dịch vụ mà chúng tôi cho rằng bạn sẽ quan tâm.
                            Chúng tôi cũng sử dụng thông tin chúng tôi thu thập về bạn để đảm bảo rằng bạn nhận được các ưu đãi và khuyến mãi phù hợp nhất
                            dựa trên việc sử dụng dịch vụ và sở thích của bạn. Bạn có thể từ chối các thông tin liên lạc này như được mô tả bên dưới.
                        </p>
                    </li>
                    <li><h6>Vì mục đích quảng cáo.</h6>
                        <p>
                            Chúng tôi phân tích thông tin về việc bạn sử dụng dịch vụ và nội dung của bạn để hiểu rõ hơn
                            cách người dùng tương tác với dịch vụ của chúng tôi và đo lường tính hiệu quả của dịch vụ để chúng tôi có thể cải
                            thiện và phát triển dịch vụ của mình cho người dùng.
                        </p>
                    </li>
                    <li><h6>Niềm vui của khách hàng.</h6>
                        <p>
                            Chúng tôi sử dụng thông tin về bạn, thông tin mà chúng tôi thu thập hoặc từ trong tài khoản của bạn,
                            thông tin bạn cung cấp cho nhóm chăm sóc khách hàng của chúng tôi và thông tin về tương tác của bạn với dịch vụ
                            để giải quyết các vấn đề kỹ thuật mà bạn gặp phải với dịch vụ và để đảm bảo rằng chúng tôi có thể sửa chữa và cải
                            thiện dịch vụ cho tất cả người dùng Onlearn.
                        </p>
                    </li>
                    <li><h6>Đối với các biện pháp an ninh.</h6>
                        <p>
                            Chúng tôi sử dụng thông tin về bạn và từ trong tài khoản của bạn để giám sát hoạt động mà chúng tôi cho
                            là đáng ngờ hoặc có khả năng lừa đảo và để xác định các hành vi vi phạm{" "} <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>  Chính sách bảo mật</Link>{" "} này
                            hoặc{" "} <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>Điều khoản sử dụng</Link>{" "}  của chúng tôi.
                        </p>
                    </li>
                    <li><h6>Đối với các vấn đề mà bạn đã đồng ý cụ thể.</h6>
                        <p>
                            Đôi khi Onlearn có thể xin phép bạn để sử dụng thông tin của bạn cho một mục đích cụ thể.
                            Khi bạn đồng ý cho chúng tôi làm như vậy, chúng tôi sẽ sử dụng nó cho mục đích đó.
                            Khi bạn không muốn chúng tôi sử dụng thông tin của bạn cho mục đích đó nữa, bạn có thể rút lại sự đồng ý của mình đối với việc sử dụng này.
                        </p>
                    </li>
                    <li><h6>Để khắc phục sự cố, giải quyết lỗi và cải thiện dịch vụ.</h6>
                        <p>
                            Chúng tôi có thể cần xem xét khóa học của bạn để hỗ trợ yêu cầu trợ giúp của bạn,
                            sửa các lỗi chung với dịch vụ Onlearn hoặc cải thiện dịch vụ của chúng tôi.
                        </p>
                    </li>
                    <li><h6>Đối với các vấn đề mà pháp luật yêu cầu chúng tôi phải sử dụng thông tin của bạn.</h6>
                        <p>
                            Onlearn sẽ sử dụng hoặc tiết lộ thông tin của bạn khi chúng tôi có lý do hợp lý để tin rằng hành động đó là cần thiết để:
                            <ol type='a'>
                                <li>Tuân thủ luật pháp và các yêu cầu hợp lý của cơ quan thực thi pháp luật;</li>
                                <li>Để thực thi {" "} <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>  Chính sách bảo mật</Link>{" "} này
                                    hoặc{" "} <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>Điều khoản sử dụng</Link>{" "}
                                    được chấp nhận của chúng tôi hoặc để bảo vệ tính bảo mật hoặc tính toàn vẹn của dịch vụ của chúng tôi;</li>
                                <li>Thực hiện hoặc bảo vệ các quyền, tài sản hoặc sự an toàn cá nhân của Onlearn, người dùng của chúng tôi hoặc những người khác.</li>
                            </ol>
                        </p>
                    </li>
                </ul>
                <Alert className="mb-3" severity="info">
                    Tóm tắt: Onlearn sử dụng thông tin về bạn vì nhiều lý do khác nhau, bao gồm để cung cấp, tùy chỉnh và cải thiện dịch vụ.
                </Alert>
                <h5>3. Chia sẻ thông tin của bạn:</h5>
                <ol type="a">
                    <li><h6>Cách chúng tôi chia sẻ thông tin của bạn.</h6>
                        <p>
                            Chúng tôi chia sẻ thông tin của bạn với các nhà cung cấp dịch vụ bên thứ ba nhằm mục đích cung cấp dịch vụ cho bạn,
                            nhằm hỗ trợ lợi ích hợp pháp của Onlearn hoặc nếu bạn đồng ý. Các nhà cung cấp dịch vụ này được chúng tôi xem xét kỹ
                            lưỡng và sẽ chỉ được cấp quyền truy cập vào thông tin của bạn khi cần thiết một cách hợp lý cho mục đích mà Onlearn đã
                            thuê nhà cung cấp dịch vụ. Chúng tôi yêu cầu các bên thứ ba đó phải tuân thủ luật pháp hiện hành và có các chính sách bảo mật,
                            quyền riêng tư và lưu giữ dữ liệu nhất quán với chính sách của chúng tôi.
                        </p>
                        <p>
                            Một số bên thứ ba mà Onlearn có thể chia sẻ thông tin cá nhân của bạn là các nhà cung cấp dịch vụ hỗ trợ Onlearn thực hiện các chức năng như:
                            <ul>
                                <li>Thanh toán;</li>
                                <li>Hỗ trợ khách hàng và quản lý khách hàng;</li>
                                <li>Dịch vụ thư điện tử;</li>
                                <li>Máy chủ và lưu trữ;</li>
                                <li>Phân tích dữ liệu và phân tích dự đoán;</li>
                                <li>Ghi nhãn dữ liệu và học máy;</li>
                                <li>Bảo mật;</li>
                                <li>Dịch vụ quảng cáo và tiếp thị;</li>
                                <li>Đăng ký tên miền;</li>
                                <li>Cung cấp các sản phẩm vật chất;</li>
                                <li>Các nhà cung cấp dịch vụ khác.</li>
                            </ul>
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Chúng tôi có thể chia sẻ một số thông tin về bạn với các đối tác kinh doanh và nhà cung cấp dịch vụ
                            bên thứ ba của chúng tôi để cung cấp dịch vụ cho bạn hoặc để đáp ứng lợi ích kinh doanh hợp pháp của Onlearn.
                        </Alert>
                    </li>
                    <li><h6>Cách bạn có thể chia sẻ nội dung người dùng của mình.</h6>
                        <p>
                            Bất kỳ thông tin hoặc nội dung nào mà bạn tự nguyện tiết lộ để đăng lên dịch vụ,
                            chẳng hạn như nội dung người dùng công khai, sẽ có sẵn để công chúng đọc, thu thập và sử dụng.
                            Khi bạn đặt hồ sơ của mình ở chế độ công khai hoặc đặt nội dung người dùng ở chế độ công khai,
                            thông tin của bạn sẽ được công khai trên toàn cầu, những người dùng khác có thể tìm kiếm được
                            và có thể được các công cụ tìm kiếm lập chỉ mục. Nếu bạn hoặc Onlearn xóa thông tin mà bạn đã đăng
                            lên dịch vụ, các bản sao vẫn có thể xem được trong các trang được lưu trong bộ nhớ đệm và lưu trữ của
                            dịch vụ hoặc nếu người dùng khác đã sao chép hoặc lưu thông tin đó.
                            <Alert className="mb-3" severity="info">
                                Tóm tắt: Khóa học của chúng tôi theo mặc định là riêng tư. Khi chia sẻ thiết kế, hãy đảm bảo chắc rằng nội dung được cân nhắc kĩ càng.
                            </Alert>
                        </p>
                    </li>
                    <li><h6>Chia sẻ liên quan đến việc sáp nhập, mua lại hoặc tổ chức lại.</h6>
                        <p>
                            Onlearn cũng có thể chia sẻ, bán hoặc chuyển giao thông tin của bạn cho các bên thứ ba liên quan đến hoặc dự tính
                            (bao gồm cả như một phần của quy trình thẩm định) mọi hoạt động sáp nhập, mua lại, tổ chức lại, cấp vốn, bán tài sản
                            , phá sản hoặc sự kiện mất khả năng thanh toán liên quan đến Onlearn hoặc bất kỳ sự kiện nào liên quan đến Onlearn. một phần tài sản,
                            dịch vụ hoặc hoạt động kinh doanh của chúng tôi. Thông tin như tên và địa chỉ email của khách hàng, nội dung người dùng và thông tin
                            người dùng khác liên quan đến dịch vụ có thể nằm trong số các mục được chia sẻ, bán hoặc chuyển giao trong các loại giao dịch này.
                            Bạn sẽ được thông báo qua email và/hoặc thông báo trên dịch vụ nếu giao dịch đó diễn ra và được thông báo về bất kỳ thay đổi quan
                            trọng nào đối với cách chúng tôi xử lý dữ liệu của bạn theo chính sách này.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Nếu chúng tôi bán doanh nghiệp của mình, bất kỳ thông tin nào chúng tôi có được về bạn đều có thể là một phần của giao dịch mua bán đó.
                        </Alert>
                    </li>
                    <li><h6>Chia sẻ dữ liệu tổng hợp.</h6>
                        <p>
                            Chúng tôi cũng có thể tổng hợp hoặc loại bỏ dữ liệu về tất cả các đặc điểm nhận dạng
                            cá nhân và có thể chia sẻ dữ liệu ẩn danh tổng hợp đó với các bên thứ ba.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Chúng tôi có thể chia sẻ dữ liệu ẩn danh với các bên thứ ba.
                        </Alert>
                    </li>
                    <li><h6>Chia sẻ với cơ quan chức năng.</h6>
                        <p>
                            Chúng tôi truy cập, lưu giữ và chia sẻ thông tin của bạn với các cơ quan quản lý, cơ quan thực thi pháp luật,
                            cảnh sát, các dịch vụ chia sẻ thông tin và gỡ bỏ cũng như các dịch vụ khác theo Chính sách yêu cầu cấp phép của
                            chúng tôi hoặc khi chúng tôi tin tưởng rằng cần phải phát hiện, ngăn chặn hoặc giải quyết gian lận, vi phạm
                            {" "} <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>  Chính sách bảo mật</Link>{" "} này
                            hoặc{" "} <Link to="##" style={{ color: 'black', textDecoration: 'underline' }}>Điều khoản sử dụng</Link>{" "}
                            được chấp nhận của chúng tôi, hoạt động có hại hoặc bất hợp pháp,
                            để bảo vệ Onlearn (quyền, tài sản hoặc tài sản trí tuệ của chúng tôi), bạn hoặc những người khác, bao gồm như một
                            phần của cuộc điều tra hoặc yêu cầu pháp lý hoặc để ngăn chặn cái chết hoặc tổn hại về thể chất sắp xảy ra làm hại.
                        </p>
                        <Alert className="mb-3" severity="info">
                            Tóm tắt: Chúng tôi có thể chia sẻ dữ liệu với các cơ quan chức năng theo Chính sách yêu cầu cấp phép của chúng tôi hoặc khi chúng tôi cảm thấy cần thiết.
                        </Alert>
                    </li>
                </ol>
                <h5>4. Giữ thông tin của bạn an toàn.</h5>
                <p>
                    Onlearn quan tâm đến tính bảo mật thông tin của bạn và sử dụng các biện pháp bảo vệ thích hợp để duy trì tính toàn
                    vẹn và bảo mật của tất cả thông tin được thu thập thông qua dịch vụ. Để bảo vệ quyền riêng tư và bảo mật của bạn,
                    chúng tôi thực hiện các bước hợp lý (chẳng hạn như yêu cầu mật khẩu) để xác minh danh tính của bạn trước
                    khi cấp cho bạn quyền truy cập vào tài khoản của mình. Bạn có trách nhiệm duy trì tính bảo mật của mật khẩu và thông
                    tin tài khoản duy nhất của mình cũng như kiểm soát quyền truy cập vào thông tin liên lạc qua email của bạn từ Onlearn mọi lúc.
                    Tuy nhiên, Onlearn không thể đảm bảo hoặc đảm bảo tính bảo mật của bất kỳ thông tin nào bạn truyền đến Onlearn hoặc đảm bảo rằng
                    thông tin trên dịch vụ không thể bị truy cập, tiết lộ, thay đổi hoặc phá hủy. Quyền riêng tư của bạn cũng có thể bị
                    ảnh hưởng bởi những thay đổi về chức năng của trang web và dịch vụ bên thứ ba mà bạn thêm vào dịch vụ Onlearn, chẳng hạn như mạng xã hội.
                    Onlearn không chịu trách nhiệm về chức năng hoặc biện pháp bảo mật của bất kỳ bên thứ ba nào.
                </p>
                <Alert className="mb-3" severity="info">
                    Tóm tắt: Chúng tôi quan tâm đến sự an toàn cho dữ liệu của bạn và đã triển khai các biện pháp được ngành công nhận để bảo vệ dữ liệu đó,
                    nhưng rất tiếc, chúng tôi không thể đảm bảo rằng sẽ không có điều gì xấu xảy ra với dữ liệu đó.
                </Alert>
                <h5>5. Chúng tôi lưu giữ thông tin của bạn trong bao lâu.</h5>
                <p>
                    Sau khi chấm dứt hoặc vô hiệu hóa tài khoản người dùng của bạn, Onlearn sẽ lưu giữ thông tin hồ sơ và
                    nội dung người dùng của bạn trong khoảng thời gian hợp lý về mặt thương mại và miễn là chúng tôi có mục đích hợp lệ để làm như vậy.
                    Đặc biệt, Onlearn sẽ lưu giữ thông tin của bạn nhằm mục đích tuân thủ các nghĩa vụ pháp lý và kiểm toán cũng như cho mục đích sao lưu và lưu trữ.
                </p>
                <Alert className="mb-3" severity="info">
                    Tóm tắt: Chúng tôi lưu giữ thông tin hồ sơ và nội dung người dùng của bạn nhằm mục đích cung cấp
                    dịch vụ của chúng tôi cho bạn và tuân thủ các nghĩa vụ pháp lý và quy định của chúng tôi.
                </Alert>
                <h5>6. Những thay đổi đối với Chính sách này.</h5>
                <p>
                    Đôi khi, chúng tôi có thể cập nhật chính sách này để phản ánh các thông tin hiện có của chúng tôi và đảm bảo tuân thủ luật pháp hành động.
                    Khi chúng tôi đăng các thay đổi đối với chính sách này, chúng tôi sẽ sửa lại ngày “Cập nhật lần cuối” ở đầu danh sách này.
                    Nếu chúng tôi thực hiện bất kỳ thay đổi quan trọng nào đối với cách chúng tôi thu thập, sử dụng, lưu trữ và/hoặc chia sẻ thông tin cá nhân của bạn,
                    chúng tôi sẽ thông báo cho bạn trên trang web của chúng tôi hoặc bằng cách gửi email đến email địa chỉ được liên kết với tài khoản Onlearn của bạn.
                    Chúng tôi khuyên bạn nên mời kiểm tra trang này để thông báo cho mình về bất kỳ thay đổi nào.
                </p>
                <Alert className="mb-3" severity="info">
                    Tóm tắt: Chúng tôi sẽ không thực hiện bất kỳ thay đổi lớn nào đối với Chính sách bảo mật của mình mà không đưa ra thông báo –
                    nhưng thỉnh thoảng bạn vẫn nên truy cập trang này.
                </Alert>
                <h5>7.Liên lạc với chúng tôi bằng cách nào.</h5>
                <p>
                    Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật hoặc dịch vụ này hoặc muốn khiếu nại, vui lòng liên hệ với chúng tôi theo địa chỉ:
                </p>
                <br />
                <p>
                    Email: onlearnservice@gmail.com
                </p>
                <p>
                    Viết:
                </p>
                <p>
                    Trưởng nhóm thực hiện dự án Onlearn
                </p>
                <p>
                    Tập thể phát triển dự án Onlearn
                </p>
                <p>
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thủ Đức, Thành phố Hồ Chí Minh
                </p>
                <p>
                    Việt Nam
                </p>
                <Alert className="mb-3" severity="info">
                    Tóm tắt: Quyền riêng tư của bạn rất quan trọng đối với chúng tôi và chúng tôi sẵn lòng trả lời bất kỳ câu hỏi nào bạn có thể có.
                </Alert>
            </div>
            <Footer />
        </Fragment >
    );
};

export default LandingPage;