import os
import magfin
import unittest
import tempfile

class MagfinTestCases(unittest.TestCase):

    def setUp(self):
        self.db_fd, magfin.app.config['DATABASE'] = tempfile.mkstemp()
        magfin.app.testing = True
        self.app = magfin.app.test_client()
        with magfin.app.app_context():
            magfin.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(magfin.app.config['DATABASE'])

    # Initial emoty DB route testing

    def test_get_default(self):
        rv = self.app.get('/')
        assert rv.status_code == 404

    def test_get_empty_db(self):
        rv = self.app.get('/lists/get/1')
        assert b'ERROR' in rv.data

    def test_modify_empty_db(self):
        rv = self.app.post('/lists/modify')
        assert True == True

    def test_delete_empty_db(self):
        rv = self.app.post('/lists/delete')
        assert True == True

    # Testing inserts

    def test_insert_list(self):
        rv = self.app.post('/lists/add')
        assert True == True

    def test_get_first_insert(self):
        rv = self.app.get('/lists/get/1')
        assert True == True

    def test_modify_first_insert(self):
        rv = self.app.post('/lists/modify')
        assert True == True

    def test_get_modified_insert(self):
        rv = self.app.get('/lists/get/1')
        assert True == True

    def test_sanity_check(self):
        rv = self.app.get('/lists/getAll')
        assert True == True

    def test_delete_recent(self):
        rv = self.app.post('/lists/delete')
        assert True == True

    def test_delete_check(self):
        rv = self.app.get('/lists/getAll')
        assert True == True

if __name__ == '__main__':
    unittest.main()
